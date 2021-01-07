import React, { Component, useState } from 'react'
import { View, Text, Image,TouchableOpacity, StyleSheet } from 'react-native'

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, choosenIndex: -1};
  }

    pressedImage = (index) => {
      this.setState({choosenIndex: index});
    }

    handleImage = (imageArray, index, slideNumber, style) => {
      let type = [];

      for (let i = 0; i < slideNumber && index < imageArray.length; ++i, ++index) {
          type.push(
            <View key={index}>
              <TouchableOpacity onPress = {
                 () => this.pressedImage(this.state.index+i)
               }>
                <View>
                    {this.state.choosenIndex == index && this.state.choosenIndex < imageArray.length ?
                      <View style={{borderWidth: 1, borderColor: 'black'}}>
                        <Image style={style} source={imageArray[index]}/>
                      </View>
                    :
                    <View>
                      <Image style={style} source={imageArray[index]}/>
                    </View>
                  }
                </View>
              </TouchableOpacity>
            </View>
          );
    }
      return type;
    };

   nextImage = (imageArray, index, slideNumber) => {
      if(index < imageArray.length-1) {
        this.setState({index: index+slideNumber});
      }
      else {
        console.log(imageArray.length);
        alert('No more images')
      }
   }

   backImage = (index, slideNumber) => {
      if(index > 0) {
        this.setState({index: index-slideNumber});
      }
      else
        alert('Error')
   }

   render() {
     var imageArray = this.props.imageArray;
     var slideNumber = this.props.slideNumber;
     var style = this.props.style;
     var index = this.state.index;
     return (
       <View>
         <View style={{flexDirection: 'row', padding: 10, justifyContent:'center'}}>
            {this.handleImage(imageArray, index, slideNumber, style)}
         </View>

        <View style={styles.next}>
           {index == 0 ? <Text>  </Text> :
           <TouchableOpacity
              onPress = {
                 () => this.backImage(index, slideNumber)
              }>
              <Text style={{ fontWeight: 'bold'}}> Back </Text>
           </TouchableOpacity>
          }

           {index > imageArray.length-slideNumber-1 ? <Text>   </Text> :
           <TouchableOpacity
              onPress = {
                 () => this.nextImage(imageArray, index, slideNumber)
              }>
              <Text style={{ fontWeight: 'bold'}}> Next </Text>
           </TouchableOpacity>
         }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   next: {
     flexDirection: 'row',
     justifyContent: 'center',
     marginTop: 0,

   },
})
