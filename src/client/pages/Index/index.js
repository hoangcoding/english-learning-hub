import React, {Component} from 'react';
import Login from '../../containers/Login';
import withLayout from "../../hocs/Layout";


class Index extends Component{

    render(){
        return (
            <div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Home page - will update</div>
            </div>
        );
    }
}

export default withLayout(Index);
