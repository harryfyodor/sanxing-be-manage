import { Form, Icon, Input, Button, Checkbox, Modal, Tag } from 'antd';
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Movie', 'Books', 'Music'];
import React, { Component } from 'react';

class NewBroadcastForm extends React.Component {
  state = {
      // selectedTags: [],
  };
  handleChange(tag, checked) {
    const { selectedTags, inputHandler } = this.props;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.props.inputHandler('selectedTags', nextSelectedTags);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let {
      content,
      selectedTags,
      tags,
      img,
      inputHandler
    } = this.props;
    return (
      <Modal title="添加广播问题"
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
        <Form>
          <FormItem>
            <Input 
              prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="题目内容" 
              value={this.props.content}
              onChange={(e) => {
                inputHandler('inputContent', e.target.value);
              }}
            />  
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="题目图片" 
              value={this.props.img}
              onChange={(e) => {
                inputHandler('inputImg', e.target.value);
              }}
            />
          </FormItem>
          <div>
            <strong>标签: </strong>
            {tags.map(tag => (
            <CheckableTag
                key={tag + 'tag'}
                checked={selectedTags.indexOf(tag) > -1}
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