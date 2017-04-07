import React, { Component } from 'react'
import { Card, Button, Modal, message } from 'antd';
import NewPic from '../components/newPic';
import Qiniu from '../utils/react-qiniu';
import ajax from '../utils/ajax';
import moment from 'moment';

class Pics extends React.Component {

  state = {
    ModalText: 'Content of the modal dialog',
    visible: false,
    files: [],
    // uploadKey: '',
    token: 'YOUR_QINIU_TOKEN',
    pictures: []
  }

  componentDidMount() {
    this.getToken();
    this.getAllPics();
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

  onUpload = (files) => {
    if(files.length !== 1) return message.info("请一张一张上传");
    let progresses = {};
    let _this = this;
    files.map((f) => {
      f.onprogress = function(e) {
          progresses[f.preview] = e.percent;
          console.log(e.percent);
          _this.setState({progresses: progresses});
          };
      });
  }

  addPicture = (name) => {
    ajax({
      url: 'picture'
    , method: 'post'
    , data: { pic: name }
    , success: (resp) => {
        if(resp.enmsg !== 'ok') return;
        this.getAllPics();
      }
    });
  }

  onDrop = (files) => {
    console.log(files[0])
    let name = files[0].preview.slice(-36);
    name = 'http://onlw66kfu.bkt.clouddn.com/' + name + '.png';
    this.getToken();
    this.addPicture(name);

    console.log('Received files: ', files);
    this.setState({
        files: files
    });
  }

  getToken = () => {
    // 获取token
    ajax({
      url: 'picture/token'
    , method: 'get'
    , success: (resp) => {
        console.log(resp)
        if(resp.enmsg !== 'ok') return;
        this.setState({
          token: resp.data.uptoken,
          // uploadKey: resp.sava_key
        })
      }
    });
  }

  getAllPics = () => {
    ajax({
      url: 'picture'
    , method: 'get'
    , success: (resp) => {
        if(resp.enmsg === 'ok') {
          this.setState({
            pictures: resp.data
          });
        }
      }
    });
  }

  render () {
    var styles = { padding: 30};
    var dropZoneStyles = {
        margin: '20px auto',
        border: '2px dashed #ccc',
        borderRadius: '5px',
        width: '300px',
        height: '200px',
        color: '#aaa'
    }
    var inputStyles = { marginTop: 30, width: 500};

    var files = this.state.files;
    var progresses = this.state.progresses;
    
    return <div>
    <div className="title">
        <h2>图片管理</h2>
        <Button style={{marginBottom: '10px'}} onClick={this.showModal}>添加图片</Button>
    </div>
    <div>
    {
      this.state.pictures.map((pic, index) => {
        return <Card key={pic._id} style={{ width: 240, display: 'inline-block', margin: '10px', 'verticalAlign': 'top'}} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
                <img alt="example" width="100%" src={pic.url} />
            </div>
            <div className="custom-card">
                <h3>Europe Street beat</h3>
                <p>{pic.url}</p>
                <Button onClick={() => {
                  ajax({
                  url: 'picture'
                , method: 'delete'
                , data: { _id: pic._id }
                , success: (resp) => {
                    if(resp.enmsg === 'ok') {
                      this.getAllPics();
                    }
                  }
                });
                }}>删除</Button>
            </div>
        </Card>
      })
     }
     </div>
     <div className="react-qiniu-example">
      <Qiniu onDrop={this.onDrop}
              onUpload={this.onUpload}
              size={300}
              token={this.state.token}
              accept="image/*"
              style={dropZoneStyles}>
        <div style={styles}> Try dropping some files here, or click files to upload. </div>
      </Qiniu>
    </div>
     <Modal title="Title of the modal dialog"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
    >
        <NewPic />
    </Modal>
    </div>
  }
}

export default Pics;

