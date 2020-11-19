/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
    <StatusBar backgroundColor="#1a584b" barStyle="light-content"/>
    <View style={{flex: 1}}>

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.rectangle}>
          <Text style={{ color: 'white', fontSize:25, marginLeft: '5%' }} >Example 1 </Text>
          </View>

          <View style={styles.icon}>
          <Image source={require('./icon.png')}
            style={{ width: 140, height: 140 }}
          />
          </View>

          <View style={styles.container}>

          <View style={styles.button}>
            <View style={styles.containerStyleRow}>
            <View marginRight={15} >
            <TouchableOpacity onPress = {() => {/* do this */}}>
                <View style={{backgroundColor: '#d6d7d7', size:30, padding: 10 }}>
                    <Text style = {{color: 'black'}}>BUTTON</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View marginLeft={15} >
            <TouchableOpacity onPress = {() => {/* do this */}}>
                <View style={{backgroundColor: '#d6d7d7', size:30, padding: 10 }}>
                    <Text style = {{color: 'black'}}>BUTTON</Text>
                </View>
            </TouchableOpacity>
            </View>
            </View>
            <View marginTop={15} style={styles.containerStyleRow} >
              <View marginRight={15} >
              <TouchableOpacity onPress = {() => {/* do this */}}>
                  <View style={{backgroundColor: '#d6d7d7', size:30, padding: 10 }}>
                      <Text style = {{color: 'black'}}>BUTTON</Text>
                  </View>
              </TouchableOpacity>
              </View>
              <View marginLeft={15} backgroundColor="black">
              <TouchableOpacity onPress = {() => {/* do this */}}>
                  <View style={{backgroundColor: '#d6d7d7', size:30, padding: 10 }}>
                      <Text style = {{color: 'black'}}>BUTTON</Text>
                  </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>

          <View style={styles.emailContainer}>
            <View style={styles.email}>
              <Text>Email</Text>
            </View>
            <TextInput
              marginLeft={70}
              selectionColor='#ff3399'
              style={{ height: 40, width: '40%', borderBottomColor: '#ff3399', borderBottomWidth: 1, }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerStyleRow: {
    flex: 1,
    padding: 4,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  container: {
    marginTop: '10%'
  },
  email: {
    marginLeft: "5%",
    marginTop: '3%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  rectangle: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#2d8577'
  },
});

export default App;
