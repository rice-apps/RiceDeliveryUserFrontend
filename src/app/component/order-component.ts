import * as React from "react"
import { inject, observer } from "mobx-react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"

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
  render() {
    return(


    );
  }
}

