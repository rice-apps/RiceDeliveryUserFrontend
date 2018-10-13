import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../theme';
/* 
  Persistent header in the app.
*/
export class Header extends React.Component<any, any>  {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.vendorHeader}>
          Vendor Name
        </Text>
        <Text>
          Logo
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: color.palette.black,
  },
  vendorHeader: {
    color: color.palette.white
  }
})