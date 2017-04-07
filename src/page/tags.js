import React, { Component } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';
import ajax from '../utils/ajax';

class Tags extends React.Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    // 获取tags
    ajax({
      url: 'tags'
    , method: 'get'
    , success: (resp) => {
        console.log(resp.data)
        this.setState({
          tags: resp.data
        });
      }
    });
  }

  addTag = (content) => {
    ajax({
      url: 'tags'
    , type: 'json'
    , method: 'post'
    , data: { tag: content }
    , success: (resp) => {
        console.log(resp);
      }
    });
  }

  removeTag = (content) => {
    console.log(content)
    ajax({
      url: 'tags'
    , type: 'json'
    , method: 'delete'
    , data: { tag: content }
    , success: (resp) => {
        console.log(resp);
      }
    });
  }

  handleClose = (removedTag) => {
    this.removeTag(removedTag);
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.addTag(inputValue)
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        <h2>标签管理</h2>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text" size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
      </div>
    );
  }
}

export default Tags;