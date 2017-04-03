package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {
  def index(remPath:String) = Action {
    Ok(views.html.index("Spark Performance Dashboard"))
  }
}
