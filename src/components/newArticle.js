import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Tag } from 'antd';
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;

class NewArticle extends React.Component {
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
      <Modal title="添加每日问题"
        visible={this.props.visible}
        onOk={this.props.onOk}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.onCancel}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.props.onOk}>
            确定
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('question', {
              rules: [{ required: true, message: '请输入题目内容' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="题目内容" />
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

const WrappedNewArticle = Form.create()(NewArticle);

export default WrappedNewArticle;