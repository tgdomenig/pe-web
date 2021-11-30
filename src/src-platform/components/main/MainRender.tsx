import React, { Component , useState, useEffect} from 'react';

import './main-styles.css'

import { Layout, Menu, Image, Modal} from 'antd';

import Navigator from './Navigator'

import Dashboard from '../dashboard/Dashboard'


export default function MainRender() {

  const { Header, Footer, Content } = Layout;

  const [routeName, setRouteName] = useState("/home")
  const [navigationProps, setNavigationProps] = useState({})

  const navigation = {
    navigate: (path: string, navigationProps={}) => {
      setNavigationProps(navigationProps);
      setRouteName("/" + path);
    }
  };


  return (
    <Layout>

      <Header className="header">
        <div>This is the header</div>
      </Header>

      <Content>
        <Navigator routeName={routeName} navigation={navigation} props={navigationProps} />
      </Content>

    </Layout>
  );
}