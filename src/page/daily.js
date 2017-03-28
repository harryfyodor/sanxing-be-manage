import React, { Component } from 'react';
import { Table, Icon, Tabs, Button, Tag } from 'antd';
import { Link } from 'react-router';
import NewBroadcast from '../components/newBroadcast';
import reqwest from 'reqwest';
import NewDaily from '../components/newDaily';
const TabPane = Tabs.TabPane;

// 还未发布
const columns = [{
  title: '题目',
  dataIndex: 'qs',
  key: 'qs',
  render: text => <a href="#">{text}</a>,
}, {
  title: '标签',
  dataIndex: 'tags',
  key: 'tags',
  render: arr => {
    return arr.map((tag, index) => {
      return <Tag key={tag + index} color="blue">{tag}</Tag>
    })
  }
}, {
  title: '喜欢',
  dataIndex: 'likes',
  key: 'likes'
}, {
  title: '回答次数',
  dataIndex: 'times',
  key: 'times'
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  qs: '你好吗？',
  likes: 20,
  times: 20,
  time: '2016-1-1',
  tags: ['tag 1', 'tag 2', 'tag 3']
}];

class Broadcast extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    ModalText: 'Content of the modal dialog',
    visible: false,
  };
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
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal dialog will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    return <div>
        <div className="title">
          <h2>每日问题</h2>
          <Button style={{marginBottom: '10px'}} onClick={this.showModal}>添加每日问题</Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={data} 
          bordered
        />
        <NewDaily
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        />
    </div>
  }
}

export default Broadcast;
