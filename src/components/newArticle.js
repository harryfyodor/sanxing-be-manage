import { Form, Icon, Input, Button, Checkbox, Modal, Tag } from 'antd';
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class NewArticle extends React.Component {
  state = {
      selectedTags: [],
  };
  style = {
      width: '100%',
      height: '200px'
  };
  editor = null;
  componentDidMount() {
    console.log("子")
    // const mc = this.refs.myComp
    // const dom = ReactDOM.findDOMNode(myComp)
    // console.log(dom)
    // console.log($('#root'));
    // console.log(this.textInput)
    // this.editor = new wangEditor(this.props.id);
    // this.editor.config = Object.assign(this.editor.config, {
    //   menus: [
    //     'source',
    //     '|',     // '|' 是菜单组的分割线
    //     'bold',
    //     'underline',
    //     'italic',
    //     'strikethrough',
    //     'eraser',
    //     'forecolor',
    //     'bgcolor'
    //   ],
    //   menuFixed: false,
    //   lang: wangEditor.langs['en']
    // })
    // this.editor.create();

    // // 初始化内容
    // this.editor.$txt.html('<p>在react中使用wangEditor</p>');
  }
  componentDidUpdate() {
    console.log($('#editor'))
    console.log(this.editor)
    if(!this.editor) {
      this.editor = new wangEditor('editor');
      this.editor.config = Object.assign(this.editor.config, {
        menus: [
          'source',
          '|',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'unorderlist',
          'orderlist',
          'alignleft',
          'aligncenter',
          'alignright',
          '|',
          'link',
          'unlink',
          'table',
          'emotion',
          '|',
          'img',
          'video',
          'location',
          'insertcode',
          '|',
          'undo',
          'redo',
          'fullscreen'
        ],
        menuFixed: false,
        lang: wangEditor.langs['en']
      })
      this.editor.create();
    }
  }
  componentWillUnmount() {
    this.editor = null;
  }
  getContent = () => {
      let content = this.editor.$txt.html();
      console.log(content);
  }
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
        width={960}
        visible={this.props.visible}
        onOk={this.props.onOk}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('question', {
              rules: [{ required: true, message: '请输入题目内容' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="题目内容" />
            )}
          </FormItem>
        </Form>
        <div ref={(c) => {
          this.inputC = c;
        }}>
          <div id={this.props.id} style={{height: '500px'}} contentEditable="true"></div>
          <Button style={{marginTop: '10px'}} onClick={this.getContent}>get content</Button>
        </div>
      </Modal>
    );
  }
}

const WrappedNewArticle = Form.create()(NewArticle);

export default WrappedNewArticle;