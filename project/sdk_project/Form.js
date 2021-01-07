import React, { Component, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import PasswordStrengthMeter from './PasswordStrengthMeter.js';
import Carousel from './Carousel.js';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { email: ''};
  }
   login = () => {
        alert('Submitted')
   }

   render() {
      var cardTypeImages = [
        require('./images/fish.png'),
        require('./images/dog.png'),
        require('./images/cow.png'),
        require('./images/chicken.png'),
        require('./images/turtle.png'),
        require('./images/snail.png'),
        require('./images/penguin.png'),
        require('./images/giraffe.png'),
        require('./images/lion.png'),
        require('./images/tiger.png'),
      ];

      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => this.setState({ email: text })}/>

            <PasswordStrengthMeter
              style={{margin: 15, marginBottom: 5, height: 40, borderWidth: 1, borderColor: '#7a42f4'}}
              placeHolderColor={'#9a73ef'}
              minCharacters={8}
            />

            <Text style={styles.animalText}>Choose your spirit animal: </Text>
            <Carousel
              imageArray={cardTypeImages}
              slideNumber={2}
              style={{flex: 1, resizeMode: 'contain', height: 120, width: 120, alignItems: 'center'}}
            />

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login()
               }>
               <Text style = {styles.submitButtonText}> Create Account </Text>
            </TouchableOpacity>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      marginBottom: 10,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      marginBottom: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
   animalText: {
     fontSize: 16,
     textAlign: 'center',
     marginTop: 10,
   }
})
