import React from 'react';
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Link} from 'react-router-dom';

const VIEW_CALLBACK_ENUMS = {
    LOGIN: 'LOGIN'
};

class Login extends React.Component {

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.callbackHandler(VIEW_CALLBACK_ENUMS.LOGIN, values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="lg:w-1/3 mx-auto p-2 mt-8 mb-8">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="block">
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                        </div>
                        {this.props.error && <span className="bg-orange-500 text-white pl-6 rounded-sm mb-2 block">{this.props.error}</span> }
                        <Button type="primary" htmlType="submit" className="w-full block"
                                loading={this.props.isLoading}>
                            Log in
                        </Button>
                        Or <Link to="/register" className="text-green-700">Register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({name: 'login'})(Login);

export default WrappedLoginForm;

export {
    VIEW_CALLBACK_ENUMS as LOGIN_CALLBACK_ENUMS,
};
