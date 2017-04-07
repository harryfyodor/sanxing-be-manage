import React, { Component } from 'react';
import { Table, Icon, Tabs, Button, Tag, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import NewBroadcast from '../components/newBroadcast';
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';
import ajax from '../utils/ajax';

class Broadcast extends React.Component {
  constructor() {
    super();
    this.state = {
      // 还未发布
      columnsBefore: [{
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
            return <Tag key={tag + index} color="blue">{tag}</Tag>
          })
        }
      }, {
        title: '图片',
        dataIndex: 'pics',
        key: 'pics',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#" 
              onClick={() => { 
                this.showModalEdit(record);
            }}>修改</a>
            <span className="ant-divider" />
            <Popconfirm 
              title="Are you sure delete this task?" 
              onConfirm={(e) => this.confirm(e, record)} 
              onCancel={this.cancel} 
              okText="Yes" 
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }, {
        title: '发布',
        key: 'action2',
        render: (text, record) => (
          <Button
            onClick={() => { this.makeItPublic(record) }}
          >发布</Button>
        ),
      }],
      // 已经发布
      columnsAfter: [{
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
            <a href="#" 
              onClick={() => { 
                this.showModalEdit(record);
            }}>修改</a>
            <span className="ant-divider" />
            <Popconfirm 
              title="Are you sure delete this task?" 
              onConfirm={this.confirm} 
              onCancel={this.cancel} 
              okText="Yes" 
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }, {
        title: '时间',
        dataIndex: 'date',
        key: 'date'
      }],
      dataBefore: [],
      dataAfter: [],
      collapsed: false,
      mode: 'inline',
      ModalText: 'Content of the modal dialog',
      visible: false,
      newAdd: true,
      inputContent: '',
      selectedTags: [],
      tags: [],
      inputImg: '',
      kind: 'public',
      questionId: null
    }
  }

  componentDidMount() {
    // 获取所有的公开问题
    this.getAllPublic();
    // 获取标签
    ajax({
      url: 'tags'
    , method: 'get'
    , success: (resp) => {
        console.log(resp)
        if(resp.enmsg === 'ok') {
          this.setState({
            tags: resp.data
          });
        }
      }
    });
  }
  confirm = (e, record) => {
    // 删除
    ajax({
      url: 'questions'
    , method: 'delete'
    , data: { questionId: record._id }
    , success: (resp) => {
        if(resp.enmsg === 'ok') {
          let kind = this.state.kind === 'public' ? 'dataAfter' : 'dataBefore',
              data = this.state[kind];
          data = data.filter((qs, index) => {
            if(qs._id === record._id) return false;
            return true
          });
          this.setState({[kind]: data});
          message.success('删除成功');
        }
      }
    });
  }
  cancel = (e) => {
    message.error('取消删除');
  }
  getAllPublic = () => {
    ajax({
      url: 'questions/broadcast/public'
    , method: 'get'
    , success: (resp) => {
        console.log(12313, resp)
        if(resp.enmsg !== 'ok') return;
        let data = resp.data.map((item, index) => {
          return {
            key: item._id + 'public',
            ...item
          }
        })
        this.setState({
          dataAfter: data
        });
      }
    });
  }
  getAllNotPublic = () => {
    ajax({
      url: 'questions/broadcast/notpublic'
    , method: 'get'
    , success: (resp) => {
        if(resp.enmsg !== 'ok') return;
        let data = resp.data.map((item, index) => {
          return {
            key: item._id + 'notpublic',
            ...item
          }
        })
        this.setState({
          dataBefore: data
        });
      }
    });
  }
  makeItPublic = (record) => {
    ajax({
      url: 'questions/broadcast'
    , method: 'put'
    , data: { 
      questionId: record._id,
      isPublic: true
    }
    , success: (resp) => {
        console.log(resp)
      }
    });
  }
  callback = (key) => {
    if(key === 'public') {
      this.setState({ kind: 'public' });
      this.getAllPublic();
    } else {
      this.setState({ kind: 'notpublic' });
      this.getAllNotPublic();
    }
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  // 新建
  showModal = () => {
    this.setState({
      visible: true,
      newAdd: true,
      inputContent: '',
      inputImg: '',
      selectedTags: [],
      questionId: null
    });
  }
  // 编辑
  showModalEdit = (record) => {
    this.setState({
      visible: true,
      newAdd: false,
      inputContent: record.content,
      inputImg: record.picture,
      selectedTags: record.tags,
      questionId: record._id
    });
  }
  // 点击确定之后
  handleOk = () => {
    let {
      dataBefore,
      dataAfter,
      newAdd,
      inputContent,
      selectedTags,
      inputImg,
      kind,
      questionId
    } = this.state;

    this.setState({
      confirmLoading: true,
    });
    if(newAdd) {
      ajax({
        url: 'questions'
      , method: 'post'
      , data: { 
        content: inputContent, 
        tags: selectedTags,
        picture: inputImg,
        type: 'broadcast',
        public: false
      }
      , success: (resp) => {
          console.log("新建成功", resp)
          if(resp.enmsg === 'ok') {
            resp.data.key = 'item' + resp.data._id;
            dataBefore.unshift(resp.data)
            this.setState({
              visible: false,
              confirmLoading: false,
              inputContent: '',
              inputImg: '',
              selectedTags: [],
              dataBefore: dataBefore
            });
          }
        }
      });
    } else {
      if(kind === 'public') {
        // 编辑已经公开的问题
        ajax({
          url: 'questions/update'
        , method: 'post'
        , data: {
          questionId: questionId,
          data: {
            content: inputContent, 
            tags: selectedTags,
            picture: inputImg,
            type: 'broadcast',
          }
        }
        , success: (resp) => {
            // 手动切掉当前页面的信息
            console.log(resp)
            let data = dataAfter.map((qs, index) => {
              if(qs._id === questionId) {
                return Object.assign(qs, {
                  content: inputContent, 
                  tags: selectedTags, 
                });
              } else {
                return qs;
              }
            });
            if(resp.enmsg === 'ok') {
              this.setState({
                visible: false,
                confirmLoading: false,
                inputContent: '',
                inputImg: '',
                selectedTags: [],
                dataAfter: data
              });
            }
          }
        });
      } else {
        // 编辑还没有公开的问题
        ajax({
          url: 'questions'
        , method: 'post'
        , data: { 
          questionId: questionId,
          data: {
            content: inputContent, 
            tags: selectedTags,
            picture: inputImg,
            type: 'broadcast',
          }
        }
        , success: (resp) => {
            // 手动切掉当前页面的信息
            let data = dataBefore.map((qs, index) => {
              if(qs._id === questionId) {
                return Object.assign(qs, {
                  content: inputContent, 
                  tags: selectedTags, 
                });
              } else {
                return qs;
              }
            });
            if(resp.enmsg === 'ok') {
              this.setState({
                inputImg: '',
                visible: false,
                confirmLoading: false,
                inputContent: '',
                selectedTags: [],
                dataBefore: data
              });
            }
          }
        });
      }
    }
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  inputHandler = (type, value) => {
    this.setState({
      [type]: value
    });
  }
  render() {
    return <div>
        <div className="title">
          <h2>广播问题</h2>
          <Button style={{marginBottom: '10px'}} onClick={this.showModal}>添加广播问题</Button>
        </div>
        <Tabs defaultActiveKey="public" onChange={this.callback}>
          <TabPane tab="已经发布" key="public">
            <Table 
              columns={this.state.columnsAfter} 
              dataSource={this.state.dataAfter} 
              bordered
            />
          </TabPane>
          <TabPane tab="还未发布" key="notpublic">
            <Table 
              columns={this.state.columnsBefore} 
              dataSource={this.state.dataBefore} 
              bordered
            />
          </TabPane>
        </Tabs>
        <NewBroadcast
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          content={this.state.inputContent}
          img={this.state.inputImg}
          selectedTags={this.state.selectedTags}
          tags={this.state.tags}
          inputHandler={this.inputHandler}
        />
    </div>
  }
}

export default Broadcast;
