import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../theme'
/*
  Persistent header in the app.
*/
export class Header extends React.Component<any, any>  {
  render() {
    return (
      <View style={styles.topContainer}>
        <Text style={styles.vendorHeader}>
          Vendor Name
        </Text>
        <Text style={styles.logo}>
          Logo
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  vendorHeader: {
    color: color.palette.black,
  }, 
  logo: {
    color: color.palette.black,
    paddingLeft: 2
  }
})