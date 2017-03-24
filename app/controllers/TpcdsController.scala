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

class TpcdsController @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller {

  val log: Logger = LoggerFactory getLogger getClass

  def collection: Future[JSONCollection] =
    reactiveMongoApi.database.map(_.collection[JSONCollection]("tpcds"))

  def syncCollection = reactiveMongoApi.db.collection("tpcds")

  def index = Action.async { implicit request =>
    val found = collection.map(_.find(Json.obj()).cursor[Tpcds]())
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
    if (wr.hasErrors) {
      BadRequest("Something went wrong")
    } else {
      Ok(wr.n + " Rows updated")
    }
  }

  def read(id: String) = TODO

  def update(id: String) = TODO

  def delete(id: String) = TODO
}