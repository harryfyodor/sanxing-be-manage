import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Tag } from 'antd';
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Movie', 'Books', 'Music'];

class NewBroadcastForm extends React.Component {
  state = {
      selectedTags: [],
  };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title="添加广播问题"
        visible={this.props.visible}
        onOk={this.props.onOk}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.onCancel}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.props.onOk}>
            登录
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('qs', {
              rules: [{ required: true, message: '请输入问题内容' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="问题内容" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pics', {
              rules: [{ required: true, message: '请输入图片URL' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="图片URL" />
            )}
          </FormItem>
          <div>
            <strong>标签: </strong>
            {tagsFromServer.map(tag => (
            <CheckableTag
                key={tag}
                checked={this.state.selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
            >
                {tag}
            </CheckableTag>
            ))}
        </div>
        </Form>
      </Modal>
    );
  }
}

const WrappedNewBroadcastForm = Form.create()(NewBroadcastForm);

export default WrappedNewBroadcastForm;