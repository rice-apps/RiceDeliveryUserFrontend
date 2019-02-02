import * as React from 'react'
import { ScrollView, View, StyleSheet, FlatList, Text, TouchableHighlight} from 'react-native';

export class PreviousOrdersScreen extends React.Component<any, any> {

  previousOrdersPush = () => {
    this.props.navigation.navigate("")
  }

  render() {
    return (
      <View>
        <Text>THIS IS THE PREVIOUS ORDERS</Text>
        <TouchableHighlight>
          <Text>TOUCH THIS FOR MORE ORDERS</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

