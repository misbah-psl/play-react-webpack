package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {
  val log:Logger = Logger(getClass);
  def index(remPath:String) = Action {
    log.info(s"Remaining path=$remPath")
    Ok(views.html.index("Spark Performance Dashboard"))
  }
}
