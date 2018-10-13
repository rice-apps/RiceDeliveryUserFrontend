import * as React from "react"
import { inject, observer } from "mobx-react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"
import { View, Text } from "react-native"


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


// interface batchProps {
//     batches: batch[]
// }

interface batchProps {
  orders: orderProps[]
}



@observer
export class BatchComponent extends React.Component<batchProps, {}> {
  render() {
    return (
          <View style={{flex: 1, flexDirection: "column"}}>
              <Text style={{paddingBottom: 10, width: "100%", height: 100, backgroundColor: "white"}}> 
              {this.props.orders[0].name}
              {this.props.orders[0].college}
              {this.props.orders[0].phoneNumber}
              {this.props.orders[0].orderTime}
              </Text>
              <Text style={{width: "100%", height: 100, backgroundColor: "white"}}> 
              {this.props.orders[1].name}
              {this.props.orders[1].college}
              {this.props.orders[1].phoneNumber}
              {this.props.orders[1].orderTime}
              </Text>
          </ View>
        )
    }
}
