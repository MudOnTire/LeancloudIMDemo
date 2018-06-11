/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import IM from './src/services/IM';
import Chat from './src/scenes/Chat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      imInited: false
    }
  }

  componentDidMount() {
    IM.init()
      .then(() => {
        this.setState({ 'imInited': true });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.imInited ?
            <Chat members={['Crixus']} />
            :
            null
        }
      </View>
    );
  }
}