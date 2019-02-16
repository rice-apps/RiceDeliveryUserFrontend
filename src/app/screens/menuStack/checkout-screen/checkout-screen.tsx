import * as React from 'react'
import { View, Text } from 'react-native';
import * as css from "../../style";


export class CheckoutScreen extends React.Component<any, any> {

  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
            <Text style={css.text.headerText}>
                CheckoutScreen
            </Text> 
        </View>

      </View>
      )
  }
}
