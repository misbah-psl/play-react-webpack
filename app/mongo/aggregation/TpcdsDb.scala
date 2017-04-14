package mongo.aggregation

import play.modules.reactivemongo.ReactiveMongoApi
import javax.inject.Inject
import play.api.Logger
import reactivemongo.play.json._
import reactivemongo.play.json.collection._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import play.api.libs.json.JsString
import play.api.libs.json.Json

class TpcdsDb () {
  
  def TpcdsDb()= {
    
  }
  
  val log:Logger = Logger(getClass);


  
  
  def aggregateValuesForTopGraph(col:JSONCollection) = {
    import col.BatchCommands.AggregationFramework.{AggregationResult, 
      Group, 
      AvgField,
      UnwindField,
      Sort,
      Ascending}
    
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
          Sort(Ascending("_id.date"))
      )
    )
    res.map(_.firstBatch)
  }
 
  
  def filterByQnameAndDates(col:JSONCollection, fromDate:String , toDate:String , qName:String) = {
    import col.BatchCommands.AggregationFramework.{AggregationResult, 
      UnwindField,
      Match
      }
    
    //JSON object with two fields date and name, with respective $ values 
    val matchDoc =  Json.obj("$and" -> 
        Json.arr(
        Json.obj("workloads.name" -> new JsString(qName)),
        Json.obj("date" -> Json.obj("$gt" -> new JsString(fromDate))),
        Json.obj("date" -> Json.obj("$lt" -> new JsString(toDate)))
      )
    )
    //this api takes two parameters, first is the first operator in the pipeline
    //the second is a list of the remaining parameters.
    val res: Future[AggregationResult] = col.aggregate(
      UnwindField("workloads"),
      List(Match(matchDoc) )
      )
    
    res.map(_.firstBatch)
  }
}