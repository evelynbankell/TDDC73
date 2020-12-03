/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Button,
   Alert,
   Image,
   Text,
   TextInput,
 } from 'react-native';
 import {Picker} from '@react-native-picker/picker';

export default class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text:'', cardMask: "####  ####  ####  ####", holder: '', month: '', year:'', indexCardType:'0', isCardFlipped: false, ccv:''}
  }
  componentDidMount() {
    this.setState({isCardFlipped: false})
  }

  handleCardNumber = (text) => {
    let formattedText = text.split(' ').join('');

    if (formattedText.length > 0) {
      // make only numbers valid
      formattedText = formattedText.replace(/[^0-9]/g, '');
      // after 4 characters, add two spaces
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g',)).join('  ');
    }

    if(formattedText.length <= 22) {
      var test = 22 - formattedText.length;
      var res = this.state.cardMask.substring(formattedText.length, 22);
      this.setState({text: formattedText})
    }
    // Discover
    if (formattedText.charAt(0) == 6) {
      this.setState({indexCardType: 3})
    }
    // Master Card
    else if (formattedText.charAt(0) == 5) {
      this.setState({indexCardType: 1})
    }
    // American Express
    else if (formattedText.charAt(0) == 3 && (formattedText.charAt(1) == 4 || formattedText.charAt(1) == 7)) {
      this.setState({indexCardType: 2})
    }
    //Visa
    else
      this.setState({indexCardType: 0})

    return formattedText;
  }

  handleCvvNumber = (ccv) => {
    let formattedText = ccv.split(' ').join('');

    if (formattedText.length > 0) {
      // make only numbers valid
      formattedText = formattedText.replace(/[^0-9]/g, '');
    }
    this.setState({ccv: formattedText})
  }


  render() {
    const { text, holder, month, year, cardType, indexCardType, ccv } = this.state;
    var cardTypeImages = [
      require('./images/visa.png'),
      require('./images/mastercard.png'),
      require('./images/amex.png'),
      require('./images/discover.png'),
    ];

    return (
      <View style={styles.form}>
      <View>
      <View style={styles.card}>
        <Image source={require('./images/22.jpeg')}
          resizeMode = 'cover'
          style={{ width: 340, height: 220 , borderRadius: 15 }}
        />
      </View>
      <View style={styles.overlay}>
      {this.state.isCardFlipped==false ?
        <Image source={require('./images/chip.png')}
          style={styles.chipImageStyle}
        />
        : <Text style={styles.chipImageStyle}>''</Text>}
      </View>
      {this.state.isCardFlipped==false ?
      <View style={[styles.type, styles.typeStyle]}>
        <Image source={cardTypeImages[indexCardType]}
          style={styles.cardTypeImageStyle}
          resizeMode="contain"
        />
        </View>
      :
      <View style={[styles.typeFlipped, styles.typeStyle]}>
        <Image source={cardTypeImages[indexCardType]}
          style={styles.cardTypeImageStyle}
          resizeMode="contain"
        />
      </View>
      }
      {this.state.isCardFlipped==false ?
      <View style={{flexDirection: 'row', marginLeft: 25, justifyContent: 'center', marginTop: 20}}>
        <TextInput
          style={styles.numberOnCardTextStyle}
          keyboardType = 'numeric'
          color="white"
          textAlign='left'
          placeholderTextColor='white'
          placeholder="####  ####  ####  ####"
          placeholderStyle={{  textShadowColor: 'rgba(0, 0, 0, 0.75)',}}
          value={this.state.text + this.state.cardMask.substring(text.length, 22)}
          maxLength={22}
          onChangeText={
            this.handleCardNumber
          }
          defaultValue={text}
        />
      </View>
      :
      <View style={[styles.blackMark, styles.boxSize]}></View> }
      <View style={{flexDirection: 'row',alignItems: 'center', marginTop: 20}}>
      {this.state.isCardFlipped==false ?
        <View style={[styles.textOnCard, styles.textShadow]}>
          <Text style={[styles.headline, styles.textShadow]}>Card Holder</Text>
          <TextInput
            color="white"
            textAlign='left'
            placeholderTextColor='white'
            placeholder="FULL NAME"
            style={styles.cardHolderTextStyle}
            onChangeText={holder => this.setState({holder: holder.toUpperCase()})}
            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
            value={holder}
            defaultValue={holder}
          />
        </View>
        :
        <Text style={{marginTop: 100}}></Text> }
        {this.state.isCardFlipped==false ?
        <View style={[styles.textOnCard, styles.textShadow]}>

          <Text style={[styles.headline, styles.textShadow]}>Expires</Text>
          <View style={{flexDirection: 'row', marginTop:9}}>
          <TextInput
            color="white"
            textAlign='right'
            placeholderTextColor='white'
            placeholder="MM"
            style={styles.expiresTextStyle}
            onChangeText={month => this.setState({ month: month })}
            defaultValue={month}
          />
          <Text style={{color: 'white', fontSize: 18, marginTop: 6,}}>/</Text>
          <TextInput
            color="white"
            textAlign='left'
            placeholderTextColor='white'
            placeholder="YY"
            style={styles.expiresTextStyle}
            onChangeText={year => this.setState({ year: year })}
            defaultValue={year}
          />
          </View>
        </View>
          :
          <View style={{flexDirection: 'column', marginBottom:40,}}>
            <Text style={[styles.headline, styles.ccvHeadline, styles.textShadow]}>CVV</Text>
              <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
                <TextInput
                  color="black"
                  textAlign='right'
                  placeholderTextColor='black'
                  placeholder=""
                  style={[ styles.boxSize, { backgroundColor: 'white', marginLeft: 30, borderRadius: 7,}]}
                  onChangeText={ccv => this.setState({ ccv: ccv })}
                  defaultValue={ccv}
                />
              </View>
            </View>
          }
        </View>
        </View>

        <Text style={styles.cardNumberTextStyle} >Card Number</Text>
        <View style={styles.cardnumber}>
          <TextInput
            style={[styles.textInputBoxStyle, { height: 40, width: '80%' }]}
            keyboardType = 'numeric'
            maxLength={22}
            placeholder=""
            onChangeText={ this.handleCardNumber }
            defaultValue={text}
            value={this.state.text}
            onTouchStart={isCardFlipped=> this.setState({isCardFlipped: false})}
          />
        </View>
        <Text style={{ marginLeft: '10%', marginTop: '4%', marginBottom: '1%', fontSize: 12 }} >Card Holder</Text>
        <View style={styles.cardnumber}>
          <TextInput
            style={[styles.textInputBoxStyle, { height: 40, width: '80%', textTransform: 'capitalize'}]}
            onChangeText={holder => this.setState({holder: holder.toUpperCase()})}
            defaultValue={holder}
            onTouchStart={isCardFlipped=> this.setState({isCardFlipped: false})}
          />
        </View>
          <View style={{ marginTop: '4%', marginBottom: '1%', flexDirection: 'row' }}>
            <Text style={{ marginLeft: '10%', fontSize: 12 }} >Expiration Date</Text>
            <Text style={{ marginLeft: '40%', fontSize: 12}} >CVV</Text>
          </View>
        <View style={styles.dates}>
        <Picker
          selectedValue={month}
          placeholder="Month"
          style={styles.pickerStyle}
          onValueChange={month => this.setState({ month: month, isCardFlipped: false })}
        >
          <Picker.Item label="Month" value="" />
          <Picker.Item label="01" value="01" />
          <Picker.Item label="02" value="02" />
          <Picker.Item label="03" value="03" />
          <Picker.Item label="04" value="04" />
          <Picker.Item label="05" value="05" />
          <Picker.Item label="06" value="06" />
          <Picker.Item label="07" value="07" />
          <Picker.Item label="08" value="08" />
          <Picker.Item label="09" value="09" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
        </Picker>
        <Picker
          selectedValue={year}
          placeholder="Year"
          style={styles.pickerStyle}
          onValueChange={year => this.setState({ year: year, isCardFlipped: false })}
        >
          <Picker.Item label="Year" value="" />
          <Picker.Item label="2020" value="20" />
          <Picker.Item label="2021" value="21" />
          <Picker.Item label="2022" value="22" />
          <Picker.Item label="2023" value="23" />
          <Picker.Item label="2024" value="24" />
          <Picker.Item label="2025" value="25" />
          <Picker.Item label="2026" value="26" />
          <Picker.Item label="2027" value="27" />
          <Picker.Item label="2028" value="28" />
          <Picker.Item label="2029" value="29" />
          <Picker.Item label="2030" value="30" />
          <Picker.Item label="2031" value="31" />
        </Picker>
          <TextInput
            style={[styles.textInputBoxStyle, styles.expiresTextStyle]}
            keyboardType = 'numeric'
            maxLength={4}
            onTouchStart={isCardFlipped=> this.setState({isCardFlipped: true})}
            onChangeText={ this.handleCvvNumber }
            defaultValue={ccv}
            value={this.state.ccv}
          />
        </View>
        <View style={styles.submitbutton}>
          <Button
            title="Submit"
            color="#2465d2"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  cardnumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbutton: {
    alignSelf: 'center',
    marginTop: '5%',
    width: '80%',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  dates: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headline: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
  },
  ccvHeadline: {
    marginLeft:310,
  },
  number: {
    fontSize: 24,
    color: 'white',
  },
  textOnCard: {
    flexDirection: 'column',
    flex: 1,
    opacity: 0.9,
    alignItems: 'center',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
  },
  type: {
    marginLeft: '60%',
    marginTop: 20,
  },
  typeFlipped: {
    opacity: 0.5,
    marginLeft: '65%',
    marginTop: 160,
  },
  typeStyle: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    width: 70,
    position: 'absolute',
  },
  blackMark: {
    marginLeft: 30,
    marginTop: 25,
    position: 'absolute',
    backgroundColor: 'black',
  },
  boxSize: {
    width: '85%',
    height: 40,
  },
  cardTypeImageStyle: {
    flex: 1,
    height: 45,
    width: 40,
  },
  cardNumberTextStyle: {
    marginLeft: '10%',
    marginTop: '10%',
    marginBottom: '1%',
    fontSize: 12,
  },
  numberOnCardTextStyle: {
    height: 50,
    width: 300,
    fontSize: 24,
    borderRadius: 7,
  },
  expiresTextStyle: {
    height: 40,
    width: '20%',
  },
  pickerStyle: {
    height: 40,
    width: '30%',
    borderRadius: 7,
  },
  chipImageStyle: {
    marginLeft:50,
    marginTop: 20,
    width: 50,
    height: 40,
    borderRadius: 5,
  },
  textInputBoxStyle: {
    borderRadius: 7,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  cardHolderTextStyle: {
    marginTop: 8,
    marginLeft: 65,
    height: 35,
    width: '70%',
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
})
