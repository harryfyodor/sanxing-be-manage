import React, { Component } from 'react';
import { Table, Icon, Tabs, Button, Tag, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import NewDaliy from '../components/newDaily';
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';
import NewDaily from '../components/newDaily';
import ajax from '../utils/ajax';

class Broadcast extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [{
        title: '题目',
        dataIndex: 'content',
        key: 'content',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: arr => {
          return arr.map((tag, index) => {
            return <Tag key={tag + index} color="blue" style={{marginTop: '10px'}}>{tag}</Tag>
          })
        }
      }, {
        title: '喜欢',
        dataIndex: 'likes',
        key: 'likes'
      }, {
        title: '回答次数',
        dataIndex: 'answers',
        key: 'answers',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#" onClick={() => {
              this.setState({
                visible: true,
                newAdd: false,
                selectedTags: record.tags,
                content: record.content,
                questionId: record._id
              });
            }}>修改</a>
            <span className="ant-divider" />
            <Popconfirm title="Are you sure delete this task?" onConfirm={(e) => this.confirm(e, record)} onCancel={this.cancel} okText="确定" cancelText="取消">
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }],
      collapsed: false,
      mode: 'inline',
      ModalText: 'Content of the modal dialog',
      visible: false,
      content: '',
      tags: [],
      selectedTags: [],
      confirmLoading: false,
      questionId: null
    };
  }
  componentDidMount() {
    // 请求所有题目
    ajax({
      url: 'questions/daily/all'
    , method: 'get'
    , success: (resp) => {
        let data = resp.data.map((item, index) => {
          return {
            key: 'item' + item._id,
            ...item
          }
        })
        this.setState({
          data: data
        })
      }
    });
    // 请求所有标签
    ajax({
      url: 'tags'
    , method: 'get'
    , success: (resp) => {
        this.setState({
          tags: resp.data
        })
      }
    });
  }
  cancel = (e) => {
    message.error('取消删除');
  }
  confirm = (e, record) => {
    // 删除
    ajax({
      url: 'questions'
    , method: 'delete'
    , data: { questionId: record._id }
    , success: (resp) => {
        if(resp.enmsg === 'ok') {
          let data = this.state.data.filter((qs, index) => {
            if(qs._id === record._id) return false;
            return true
          });
          this.setState({data: data});
          message.success('删除成功');
        }
      }
    });
  }
  callback = (key) => {
    console.log(key);
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
      newAdd: true,
      content: '',
      selectedTags: []
    });
  }
  handleOk = () => {
    let { 
      content, 
      selectedTags, 
      newAdd,
      questionId,
      data
    } = this.state;
    this.setState({
      confirmLoading: true,
    });
    if(newAdd) {
      // 新建
      ajax({
        url: 'questions'
      , method: 'post'
      , data: { content: content, tags: selectedTags, type: 'daily' }
      , success: (resp) => {
          if(resp.enmsg === 'ok') {
            resp.data.key = 'item' + resp.data._id;
            data.unshift(resp.data)
            this.setState({
              visible: false,
              confirmLoading: false,
              content: '',
              selectedTags: [],
              data: data
            });
          }
        }
      });
    } else {
      // 更改
      ajax({
        url: 'questions/update'
      , method: 'post'
      , data: { 
        questionId: questionId, 
        data: {
          content: content, 
          tags: selectedTags, 
        } 
      }
      , success: (resp) => {
          data = data.map((qs, index) => {
            if(qs._id === questionId) {
              return Object.assign(qs, {
                content: content, 
                tags: selectedTags, 
              })
            } else {
              return qs
            }
          });
          if(resp.enmsg === 'ok') {
            this.setState({
              visible: false,
              confirmLoading: false,
              content: '',
              selectedTags: [],
              data: data
            });
          }
        }
      });
    }
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
      content: '',
      selectedTags: []
    });
  }
  tagsHandler = (tags) => {
    this.setState({
      selectedTags: tags
    });
  }
  contentHandler = (e) => {
    this.setState({
      content: e.target.value
    });
  }
  render() {
    return <div>
        <div className="title">
          <h2>每日问题</h2>
          <Button style={{marginBottom: '10px'}} onClick={this.showModal}>添加每日问题</Button>
        </div>
        <Table 
          columns={this.state.columns} 
          dataSource={this.state.data} 
          bordered
        />
        <NewDaliy
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          contentHandler={this.contentHandler}
          content={this.state.content}
          tagsHandler={this.tagsHandler}
          tags={this.state.tags}
          selectedTags={this.state.selectedTags}
        />
    </div>
  }
}

export default Broadcast;
