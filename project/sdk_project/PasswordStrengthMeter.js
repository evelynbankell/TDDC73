import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class PasswordStrengthMeter extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', passwordInfo: '', color: 'black' };
  }
   handlePassword = (text) => {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      this.setState({ password: text })

      if(text.length < this.props.minCharacters) {
        this.setState({passwordInfo: 'Password too short'});
        this.setState({color: 'gray'});
      }
      else if(text.length >= this.props.minCharacters) {
        this.setState({passwordInfo: 'Weak'});
        this.setState({color: 'red'});

        if(text.length > this.props.minCharacters-1 && (/\d/.test(text) || format.test(text) || /[A-Z]/.test(text))) {
        this.setState({passwordInfo: 'Fair'});
        this.setState({color: 'orange'});

          if(/[A-Z]/.test(text) && /\d/.test(text) || (format.test(text) && /\d/.test(text)) || /[A-Z]/.test(text) && format.test(text)) {
            this.setState({passwordInfo: 'Good'});
            this.setState({color: 'blue'});

            if(format.test(text) && /[A-Z]/.test(text) && /\d/.test(text)) {
              this.setState({passwordInfo: 'Strong'});
              this.setState({color: 'green'});
            }
          }
        }
      }
   }
   render() {
      var strengthColor = this.state.color;
      var placeHolderColor = this.props.placeHolderColor;
      var style = this.props.style;
      return (
         <View>
            <TextInput style={style}
               secureTextEntry={true}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor ={placeHolderColor}
               autoCapitalize = "none"
               onChangeText={this.handlePassword}/>
            <Text style={styles.strengthText}>Minimum of {this.props.minCharacters} characters in length</Text>
            <Text style={{marginLeft: 15, color: strengthColor, fontWeight: 'bold'}}>{this.state.passwordInfo}</Text>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   strengthText: {
     marginLeft: 15,
     marginBottom: 10,
   },
})
