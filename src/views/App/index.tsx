/// <reference path="../../index.d.ts" />

import * as React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

import * as styles from './style.css';
import * as logoSrc from '../../assets/images/logo.png';

import Hello from '../Hello';

@CSSModules(styles, {
  allowMultiple: true
})
export default class App extends React.Component {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Layout styleName="main-layout" >

        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div styleName="logo">
            <img src={logoSrc} alt="logo" />
            <span>XX管理系统</span>
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>商品管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/foo">
                <Icon type="video-camera" />
                <span>测试路由</span>
              </Link>
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout>

          <Header styleName="header">
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>

          <Content styleName="content">
            <div style={{ height: 1000 }}>
              <Hello />
            </div>
          </Content>

        </Layout>

      </Layout>
    );
  }
}
