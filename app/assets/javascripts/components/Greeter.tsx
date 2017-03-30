import * as React from "react";
import container from "../inversify.config";
import Battle from "../interfaces/battle";
import SERVICE_IDENTIFIER from "../constants/identifiers";

export interface GreeterProps { name:string }

export class Greeter extends React.Component<GreeterProps,undefined> {
    render() {
        let epicBattle = container.get<Battle>(SERVICE_IDENTIFIER.BATTLE)
        return (<p>Hello, {this.props.name + epicBattle.fight()}</p>)
    }
}

