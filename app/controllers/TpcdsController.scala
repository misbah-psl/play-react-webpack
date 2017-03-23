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

class TpcdsController @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller {

  def collection: Future[JSONCollection] =
    reactiveMongoApi.database.map(_.collection[JSONCollection]("tpcds"))

  def index = Action.async { implicit request =>
    val found = collection.map(_.find(Json.obj()).cursor[Tpcds]())
    found.flatMap(_.collect[List]()).map {
      bm =>
        Ok(Json.toJson(bm))
    }.recover {
      case e =>
        e.printStackTrace()
        BadRequest(e.getMessage())
    }
  }

  def create = Action(parse.json) { implicit request =>
    val tpcdsResult = request.body.validate[Tpcds]
    tpcdsResult.fold(
      errors => {
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))
      },
      tpcds => {
        val wr = collection.map(_.insert(tpcds))
        wr.onComplete {
          case Failure(e) => e.printStackTrace()
          case Success(writeResult) =>
            println(s"successfully inserted document with result: $writeResult")
            Ok(Json.obj("status" -> "OK", "message" -> ("Place '" + tpcds.name + "' saved.")))
        }

      })
    Ok("Got request [ " + request + " ]")
  }

  def read(id: String) = TODO

  def update(id: String) = TODO

  def delete(id: String) = TODO
}