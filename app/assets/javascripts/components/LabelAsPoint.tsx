
import * as  React from 'react';

export default class LabelAsPoint extends React.Component <any,any>{
    onClick = () => {
        const { index, key, payload } = this.props;
        // you can do anything with the key/payload
		console.log(index, key, payload);
    }
    render() {
        const { x, y } = this.props;
        return (
            <circle
                className='dot'
                onClick={this.onClick}
                cx={x}
                cy={y}
                r={8}
                fill="transparent"/>
        );
    }
}