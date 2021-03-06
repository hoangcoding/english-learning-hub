import React from 'react';
import {Button, Form, Icon, Input} from "antd";

class CreateNewGame extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('code', {
                    rules: [{required: true, len: 4, message: 'Please input 4-characters code!'}],
                })(
                    <Input
                        prefix={<Icon type="number" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Enter your 4-characters code"
                    />,
                )}
            </Form.Item>
            <Button type="primary" shape="round" icon="double-right" size="large"
                    className="mx-auto block mt-5" htmlType="submit">
                Create
            </Button>
        </Form>);
    };
}

const WrappedCreateNewGame = Form.create({name: 'createNewGame'})(CreateNewGame);
export default WrappedCreateNewGame;
