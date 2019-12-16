import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoginForm, {LOGIN_CALLBACK_ENUMS} from "../../components/Login";
import {login} from './login.action';
import {push} from 'connected-react-router'

class Login extends React.Component {

    componentDidMount() {
        const {loginState, push} = this.props;
        console.log(!!loginState.get('userInfo'));
        if (!!loginState.get('userInfo')) push('/');
    }

    callbackHandler = (type, data) => {
        const {login} = this.props;
        switch (type) {
            case LOGIN_CALLBACK_ENUMS.LOGIN:
                login(data.email, data.password);
                break;
            default:
                break;
        }
    };

    render() {
        const {loginState} = this.props;
        return (<>
            <LoginForm callbackHandler={this.callbackHandler} isLoading={loginState.get('isLoading')}
                       error={loginState.get('error')} />
        </>);
    }
}


const mapStateToProps = state => ({
    loginState: state.authentication.login
});

const mapDispatchToProps = {
    login,
    push,
};


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);