import { Container } from "inversify";
//reflect-metadata should be imported 
//before any interface or other imports
//also it should be imported only once
//so that a singleton is created.
import "reflect-metadata";
import Battle from "./interfaces/battle";
import EpicBattle from "./interfaces/epic_battle";
let container = new Container();
container.bind<Battle>("Batle").to(EpicBattle);
export default container;