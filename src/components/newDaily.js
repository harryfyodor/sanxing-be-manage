import { Form, Icon, Input, Button, Checkbox, Modal, Tag } from 'antd';
import ajax from '../utils/ajax';
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
import React, { Component } from 'react';

class NewArticle extends React.Component {
  handleChange(tag, checked) {
    console.log(tag, checked, this.state)
    const { selectedTags } = this.props;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    this.props.tagsHandler(nextSelectedTags);
  }
  render() {
    let {
      visible,
      onOk,
      confirmLoading,
      onCancel,
      contentHandler,
      content,
      selectedTags,
      tags
    } = this.props;
    return (
      <Modal title="添加每日问题"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={onOk}>
            确定
          </Button>,
        ]}
      >
        <Form>
          <FormItem>
            <Input 
              prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
              placeholder="题目内容" 
              onChange={contentHandler}
              value={content}
            />
            </FormItem>
          <div>
            <strong>标签: </strong>
            {tags.map(tag => (
            <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
                style={{marginTop: 8}}
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