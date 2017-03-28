import React, { Component } from 'react';
import { Table, Icon, Tabs, Button, Tag, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import NewBroadcast from '../components/newBroadcast';
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

const data = [{
  key: '1',
  qs: '你好吗？',
  pics: 'www.baidu.com',
  likes: 20,
  time: '2016-1-1',
  tags: ['tag 1', 'tag 2', 'tag 3']
}];

class Broadcast extends Component {
  constructor() {
    super();
    this.state = {
      // 还未发布
      columnsBefore: [{
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
      },{
        title: '图片',
        dataIndex: 'pics',
        key: 'pics',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#" onClick={() => { this.setState({visible: true}) }}>修改</a>
            <span className="ant-divider" />
            <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }],
      // 已经发布
      columnsAfter: [{
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
        key: 'likes',
      }, {
        title: '图片',
        dataIndex: 'pics',
        key: 'pics',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#" onClick={() => { this.setState({visible: true}) }}>修改</a>
            <span className="ant-divider" />
            <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      }],
      collapsed: false,
      mode: 'inline',
      ModalText: 'Content of the modal dialog',
      visible: false
    }
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
          <h2>广播问题</h2>
          <Button style={{marginBottom: '10px'}} onClick={this.showModal}>添加广播问题</Button>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="已经发布" key="1">
            <Table 
              columns={this.state.columnsAfter} 
              dataSource={data} 
              bordered
            />
          </TabPane>
          <TabPane tab="还未发布" key="2">
            <Table 
              columns={this.state.columnsBefore} 
              dataSource={data} 
              bordered
            />
          </TabPane>
        </Tabs>
        <NewBroadcast
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        />
    </div>
  }
}

export default Broadcast;
