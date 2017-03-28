import * as React from "react";


export interface GreeterProps { name:string }

export class Greeter extends React.Component<GreeterProps,undefined> {
    render() {
        return (<p>Hello, {this.props.name}</p>)
    }
}

