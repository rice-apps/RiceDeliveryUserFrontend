import * as React from 'react'
import { Button, View, FlatList } from 'react-native';
import * as css from "../../style";
import { NavigationScreenProps } from 'react-navigation'
import Order, { mock_orders } from '../../../components/temporary-mock-order';
import OrderHistItem from '../../../components/order-hist-item';
import PrimaryButton from '../../../components/primary-button.js';
import gql from 'graphql-tag'
import { inject, observer } from 'mobx-react';
import { client } from "../../../main";
import LoadingScreen from '../../loading-screen';

export const GET_ACTIVE_ORDERS = gql`
  query getUserOrder($user_netid: String) {
    user(netID: $user_netid){
      activeOrders{
        id
        orderStatus{
          pending
          onTheWay
          fulfilled
          unfulfilled
        }
        location{
          name 
        }
        items{
          amount
          description
          parent
          quantity
        }
      }
    }
  }
`

export const GET_ORDERS = gql`
  query getUserOrder($user_netid: String) {
    user(netID: $user_netid){
      orders{
        id
        orderStatus{
          pending
          onTheWay
          fulfilled
          unfulfilled
        }
        location{
          name 
        }
        items{
          amount
          description
          parent
          quantity
        }
      }
    }
  }
`

// List of orders for each page
const orders = [
  [
    mock_orders.order3,
    mock_orders.order1,
    mock_orders.order2,
  ],
  [
    mock_orders.order2,
    mock_orders.order3,
  ],
  [
    mock_orders.order1,
  ],
]

@inject("rootStore")
@observer
export class OrderHistoryScreen extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: {},
      idx: 0,
      activeOrders:{}
    }
  }

  async activeOrders() {
    return await client.query({
      query: GET_ACTIVE_ORDERS,
      // variables: {$user_netid: this.props.rootStore.userStore.user.netID}
      variables: {
        "user_netid": "jl23"
      }
    })
  }

  async getOrders() {
    return await client.query({
      query: GET_ORDERS,
      // variables: {$user_netid: this.props.rootStore.userStore.user.netID}
      variables: {
        "user_netid": "jl23"
      }
    })
  }

  // // Handle older orders button
  // olderOrdersPush = () => {
  //   this.setState((state, props) => {
  //     if (state.idx < orders.length - 1) {
  //       ++state.idx;
  //       return {
  //         orders: orders[state.idx],
  //         idx: state.idx
  //       };
  //     }
  //   });
  // }

  // // Handle recent orders button
  // recentOrdersPush = () => {
  //   this.setState((state, props) => {
  //     if (state.idx > 0) {
  //       --state.idx;
  //       return {
  //         orders: orders[state.idx],
  //         idx: state.idx
  //       };
  //     }
  //   });
  // }

  
  
  async componentWillMount() {
    const info = await this.activeOrders();
    const info2 = await this.getOrders();
    console.log("pringing email of order: " + JSON.stringify(info2.data.user[0].orders));
    this.setState({
      loading: false,
      // activeOrders: info.data.user[0].activeOrders
      active_orders:   info2.data.user[0].orders.filter(item => !item.orderStatus.fulfilled && !item.orderStatus.fulfilled),
      finished_orders: info2.data.user[0].orders.filter(item => item.orderStatus.fulfilled || item.orderStatus.unfulfilled)
    })
  }
  

  render() {
    if (this.state.loading) {
      return <LoadingScreen />
    } else {
      let { finished_orders, active_orders } = this.state;
      return (
        <View style={css.screen.defaultScreen}>
          <FlatList
            style={css.flatlist.container}
            data={active_orders}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
              <OrderHistItem style={css.text.itemText} order={item} />
            }
          />


          <FlatList
            style={css.flatlist.container}
            data={finished_orders}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
              <OrderHistItem style={css.text.itemText} order={item} />
            }
          />
          {/* <View>
            <PrimaryButton
              title={"Older Orders"}
              onPress={this.olderOrdersPush}
            />
            <PrimaryButton
              title={"More Recent Orders"}
              onPress={this.recentOrdersPush}
            />
          </View> */}
        </View>
      )
    }
  }

}

