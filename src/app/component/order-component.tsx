import * as React from "react"
import { inject, observer } from "mobx-react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState, DrawerItems } from "react-navigation"
import { View, TextStyle } from 'react-native' 
import { Text } from '../../views/shared/text'
import { TextField } from '../../views/shared/text-field'

const BOLD: TextStyle = { fontWeight: "bold" }


interface orderProps {
  name: string,
  college: string, 
  phoneNumber: string, 
  orderTime: number
  items: item[]
}

interface item {
  itemName: string, 
  quantity: number, 
  other?: any
}


@observer
export class OrderComponent extends React.Component<orderProps, {}> {

  getItemNames (items: item[]) {
     items.map((item, index) => 
     <View  key ={index}>
      <Text>{item.quantity} {item.itemName}</Text>)
   </View>)
  }
  render() {
    return (
      <Text>
        {this.props.name}{"  -  "}{this.props.college}
        {this.props.orderTime}{"\n"}
        Items: {this.getItemNames(this.props.items)}{"\n"}
        Phone: {this.props.phoneNumber}
      </Text>
    );
  }
}

