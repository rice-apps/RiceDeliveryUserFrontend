import * as React from 'react'
import { ScrollView, View, StyleSheet, FlatList, Text, TouchableHighlight} from 'react-native';

export class OrderHistoryScreen extends React.Component<any, any> {

  previousOrdersPush = () => {
    this.props.navigation.navigate("")
  }

  render() {
    return (
      <View>
        <Text>This is OrderHistoryScreen</Text>
      </View>
    )
  }
}

