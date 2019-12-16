import React, {Component} from 'react';
import { Progress } from 'antd';
import './index.scss';
class ProgressBar extends Component {
    render(){
        return(
            <Progress percent={this.props.progress} className="progressBar"/>
        )
    }
}

export default ProgressBar;