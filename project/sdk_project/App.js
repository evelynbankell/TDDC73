/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Form from './Form.js';

const initialState = {
   email: '',
   password: ''
};

const App: () => React$Node = () => {
  const [state, setState] = useState(initialState);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.headerText}>Sign up Form</Text>
            <Form/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  input: {
   margin: 15,
   height: 40,
   borderColor: '#7a42f4',
   borderWidth: 1
  },
  headerText: {
     fontSize: 24,
     marginTop: 10,
     alignSelf: 'center',
  },
});

export default App;
