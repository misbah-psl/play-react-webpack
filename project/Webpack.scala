import java.net.InetSocketAddress
import play.sbt.PlayRunHook
import sbt._

object Webpack {
  def apply(base: File): PlayRunHook = {
    object WebpackHook extends PlayRunHook {
      var process: Option[Process] = None

      override def beforeStarted() = {
        
        println("Starting webpack")
        process = Option(
          Process("webpack.cmd", base).run
        )
      }

    /*  override def afterStarted(addr: InetSocketAddress) = {
        process = Some(
          Process("webpack.cmd --watch", base).run
        )
      }

      override def afterStopped() = {
        process.map(p =>p.destroy())
        process = None
      }
    }*/
    }
    WebpackHook
  }
}