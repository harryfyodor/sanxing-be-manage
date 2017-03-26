import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon, Modal, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import routes from './router';
import ModalLogin from './components/login';

class App extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    ModalText: 'Content of the modal dialog',
    visible: false,
  };
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
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">三醒后台</Link></Menu.Item>
              <Menu.Item key="2"><span onClick={this.showModal}>退出登录</span></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '50px 50px', 'fontSize': '16px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" title={<span style={{ 'fontSize': '14px' }}><Icon type="question-circle" />问题管理</span>}>
                    <Menu.Item key="1" style={{ 'fontSize': '14px' }}><Link to="/daily">每日问题</Link></Menu.Item>
                    <Menu.Item key="2" style={{ 'fontSize': '14px' }}><Link to="/broadcast">广播问题</Link></Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span style={{ 'fontSize': '14px' }}><Icon type="book" />文章推荐</span>}>
                    <Menu.Item key="3" style={{ 'fontSize': '14px' }}><Link to="/articles">文章推荐</Link></Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span style={{ 'fontSize': '14px' }}><Icon type="laptop" />标签管理</span>}>
                    <Menu.Item key="5" style={{ 'fontSize': '14px' }}><Link to="/tags">标签管理</Link></Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {routes.map((route, index) => {
                  return <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                })}
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
          <ModalLogin 
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          />
        </Layout>
      </Router>
    );
  }
}

export default App;