package controllers.requests.model
import play.api.libs.json.{Json, Reads, Writes}

case class FilterRequest(q_name: String,
                 from_date: String,
                 to_date: String);
object FilterRequest {
  implicit val frReads: Reads[FilterRequest] = Json.reads[FilterRequest] 
  implicit val frWrites: Writes[FilterRequest] = Json.writes[FilterRequest]
}
  
