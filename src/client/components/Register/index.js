import React from 'react';
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Link} from 'react-router-dom';
import {omit} from 'lodash';

const VIEW_CALLBACK_ENUMS = {
    REGISTER: 'REGISTER'
};

class Register extends React.Component {
    state = {
        confirmDirty: false,
    };
    componentDidMount() {

    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.callbackHandler(VIEW_CALLBACK_ENUMS.REGISTER, omit(values, 'confirm'));
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
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: 'Please input your first name!'}],
                        })(
                            <Input
                                prefix={<Icon type="profile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="First Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('lastName', {
                            rules: [{required: true, message: 'Please input your last name!'}],
                        })(
                            <Input
                                prefix={<Icon type="profile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Last Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                              placeholder="Password" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(
                            <Input.Password onBlur={this.handleConfirmBlur}
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Confirm Password"
                            />,
                        )}

                    </Form.Item>
                    <Form.Item>
                        <div className="block">
                            {this.props.error && <span className="bg-orange-500 text-white px-6 rounded-sm mb-2 block">{this.props.error}</span> }
                        </div>
                        <Button type="primary" htmlType="submit" className="w-full block">
                            Register
                        </Button>
                        Already has an account?
                        <Link to="/login" className="text-green-700"> Login here</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedRegisterForm = Form.create({name: 'register'})(Register);

export default WrappedRegisterForm;

export {
    VIEW_CALLBACK_ENUMS as REGISTER_CALLBACK_ENUMS,
};
