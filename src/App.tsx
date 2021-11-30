import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from '@aws-amplify/core'
import { Auth } from '@aws-amplify/auth'
import API from '@aws-amplify/api'

import { Storage } from 'aws-amplify';

import awsconfig from './aws-exports';

import MainRender from './src-platform/components/main/MainRender'

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
API.configure(awsconfig);


function App() {
  return (
    <MainRender />
  )
}

export default App;
