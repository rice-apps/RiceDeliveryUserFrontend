import * as React from 'react'
import { View, Text } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'



export class CartScreen extends React.Component<any, any> {

  constructor(props) {
    super(props) 
  }

    // Link to checkout screen
    checkoutPush = () => {
        this.props.navigation.navigate("Checkout")
      }
    

  render() {
    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
            <Text style={css.text.headerText}>
                CartScreen
            </Text> 
        </View>

        <PrimaryButton
            title ="Checkout"
            onPress = {this.checkoutPush}
          />


      </View>
      )
  }
}
