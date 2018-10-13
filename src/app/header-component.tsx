import * as React from 'react'
import { View, Text } from 'react-native';

/* 
  Persistent header in the app.
*/
export class Header extends React.Component<any, any>  {
  render() {
    return (
      <View>
        <Text>
          Vendor Name
        </Text>
        <Text>
          Logo
        </Text>
      </View>
    )
  }
}