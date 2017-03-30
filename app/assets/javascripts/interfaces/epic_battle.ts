import { injectable} from "inversify";
import Battle from "./battle";


@injectable()
class EpicBattle implements Battle {

    public fight() {
        let desc = 'fight fight fight!!';
        return desc;
    }

}

export default EpicBattle;