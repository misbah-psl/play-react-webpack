package controllers
import play.api._

import play.api.mvc._
import play.modules.reactivemongo.ReactiveMongoApi
import javax.inject.Inject
import scala.concurrent.ExecutionContext.Implicits.global
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.Future
import play.api.libs.json.{ Json, JsObject, JsString }

import reactivemongo.play.json._
import reactivemongo.play.json.collection._

import models.Tpcds
import models.Tpcds._
import play.api.libs.json.JsError
import scala.util.Failure
import scala.util.Success
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import play.api.libs.json.JsPath
import play.api.data.validation.ValidationError
import reactivemongo.api.commands.WriteResult
import scala.concurrent.Await

import scala.concurrent.duration._
import scala.concurrent.duration.Duration.Infinite
import scala.concurrent.duration.Duration.Infinite
import reactivemongo.bson.BSONDocument
import reactivemongo.bson.BSONString
import play.api.libs.json.JsValue
import reactivemongo.api.SortOrder



class TpcdsController @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller {

  val log: Logger = LoggerFactory getLogger getClass

  def collection: Future[JSONCollection] =
    reactiveMongoApi.database.map(_.collection[JSONCollection]("tpcds"))

  def syncCollection = reactiveMongoApi.db.collection("tpcds")

  def index = Action.async { implicit request =>
    val found = collection.map(_.find(Json.obj())
        .sort(Json.obj("date" -> -1))
        .cursor[Tpcds]())
    found.flatMap(_.collect[List]()).map {
      bm =>
        Ok(Json.toJson(bm))
    }.recover {
      case e =>
        log.error("Something went wrong", e)
        e.printStackTrace()
        BadRequest(e.getMessage())
    }
  }

  
  def create_exp = Action.async(parse.json) { implicit request =>
    val tpcdsResult = request.body.validate[Tpcds]
    tpcdsResult.fold[Future[Result]](
      errors => {
        log.error("Validation failed:" + errors)
        Future { BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors))) }
      },
      tpcds => {
        collection.flatMap(_.insert(tpcds).map[Result](wr => wrToResult(wr)))
      })
  }

  
  def create = Action.async(parse.json) { implicit request =>
    val tpcdsResult = request.body.validate[Tpcds]
    tpcdsResult.fold[Future[Result]](
      errors => {
        log.error("Validation failed:" + errors)
        Future { BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors))) }
      },
      tpcds => {
        val response = collection.map(_.insert(tpcds).map[Result](wr => wrToResult(wr)))
        Await.result(response, scala.concurrent.duration.Duration.Inf)
      })

  }

  def create_mongo_old_api = Action.async(parse.json) { implicit request =>
    val tpcdsResult = request.body.validate[Tpcds]
    tpcdsResult.fold(
      errors => {
        log.error("Validation failed:" + errors)
        Future{ BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors))) } 
      },
      tpcds => {
        val response = syncCollection.insert(tpcds)
        response.map(wrToResult)
      })
  }
  
  def wrToResult(wr: WriteResult): Result = {
    if (wr.ok) {
      Ok(wr.n + " Rows updated")
    } else {
      BadRequest(wr.writeErrors.mkString(","))
    }
  }
  
  def graph = Action.async{ implicit request =>
    val x = collection.flatMap(aggregateValues(_))
    x.map( a => Ok(Json.toJson(a))) 
  }

  /*
   *  db.tpcds.aggregate([{$unwind:"$workloads"},
		{$unwind:"$workloads.metrics"},
		{$group:{_id:{date:"$date",name:"$workloads.metrics.name"},average:{$avg:"$workloads.metrics.value"}}},
		{$sort:{_id:1}}])
   * 
   * */
  def aggregateValues(col:JSONCollection) = {
    import col.BatchCommands.AggregationFramework.{AggregationResult, 
      Group, 
      AvgField,
      UnwindField,
      Sort,
      Descending}
    
    //JSON object with two fields date and name, with respective $ values 
    val groupByIdentifier =  
        Json.obj(  "date" -> JsString("$date"),  
                  "name" -> JsString("$workloads.metrics.name")
        )
    //this api takes two parameters, first is the first operator in the pipeline
    //the second is a list of the remaining parameters.
    val res: Future[AggregationResult] = col.aggregate(
      UnwindField("workloads"),
      List( UnwindField("workloads.metrics"),
          Group(groupByIdentifier)("average"-> AvgField("workloads.metrics.value")),
          Sort(Descending("_id.date"))
      )
    )
    res.map(_.firstBatch)
  }
  
  def read(id: String) = TODO

  def update(id: String) = TODO

  def delete(id: String) = TODO
}