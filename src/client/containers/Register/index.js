import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RegisterForm, {REGISTER_CALLBACK_ENUMS} from "../../components/Register";
import {register} from './register.action';

class Register extends React.Component {
    callbackHandler = (type, data) => {
        const {register} = this.props;
        switch (type) {
            case REGISTER_CALLBACK_ENUMS.REGISTER:
                register(data.email, data.firstName, data.lastName, data.password);
                break;
            default:
                break;
        }
    };
    render() {
        const {registerState} = this.props;
        return (<>
            <RegisterForm callbackHandler={this.callbackHandler} isLoading={registerState.get('isLoading')}  error={registerState.get('error')} />
        </>);
    }
}


const mapStateToProps = state => ({
    registerState: state.authentication.register
});

const mapDispatchToProps = {register};


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Register)
);