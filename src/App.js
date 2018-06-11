import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
import {Menu, Segment, Item, Icon} from 'semantic-ui-react';
import MainDash from './screens/MainDash.js';

Amplify.configure(aws_exports);

let apiName = 'sampleCloudApi';//name generated by awsmobile, need to change now
let path = '/items';

class App extends Component {

  componentDidMount(){
      API.get(apiName, path).then(response => {
        console.log(response)
      });
    }

    render() {
      return (
        <Segment>
          <Menu>
             <Menu.Item name='home'> <Icon name="home"/></Menu.Item>
             <Menu.Item name='Something'/>
             <Menu.Item name='AnotherThing' />
             <Menu.Item name='All the things' />
           </Menu>
           <MainDash />
        </Segment>
      );
    }
  }


export default App;
