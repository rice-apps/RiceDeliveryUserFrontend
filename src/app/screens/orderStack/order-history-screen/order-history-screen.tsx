import * as React from 'react'
import { Text, Button, View, FlatList } from 'react-native';
import * as css from "../../style";
// import Order, { mock_orders } from '../../../components/temporary-mock-order';
import OrderHistItem from '../../../components/order-hist-item';
import gql from 'graphql-tag'
import { inject, observer } from 'mobx-react';
import { client } from "../../../main";
import LoadingScreen from '../../loading-screen';
import { getOrderTime } from '../../util';
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProps } from 'react-navigation';

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

export interface OrderHistoryScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class OrderHistoryScreen extends React.Component<OrderHistoryScreenProps, any> {

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
        "user_netid": "wsm3"
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
  
   async componentWillMount() {
     let netID = this.props.rootStore.userStore.user.netID;
     await this.props.rootStore.orderStore.getOrders(netID);
     let { active, previous } = this.props.rootStore.orderStore;
     console.log(active);
     console.log(previous);
     this.setState({
       loading: false,
       activeOrders: active,
       orders: previous
     });
    // // const info = await this.activeOrders();
	  // const info = await this.getOrders();

	  // var orders = info.data.user[0].orders;

	  // // Sort the orders by time
    // orders.sort((o1, o2) => {
		// return getOrderTime(o2).getTime() - getOrderTime(o1).getTime();
    // })
	
    // this.setState({
    //   loading: false,
    //   active_orders: orders.filter(item => !item.orderStatus.fulfilled),
    //   previous_orders: orders.filter(item => item.orderStatus.fulfilled)
    // })
  }



  render() {
    if (this.state.loading) {
      return(
		<View style={css.screen.defaultScreen}>
			<View style={css.screen.accountScreenContainer}>
				<LoadingScreen />
			</View>
		</View>)
    } else {
	  let { orders, activeOrders } = this.state;

	//   active_orders = [];

	  let pendingOrders = 
		<View style={css.screen.defaultScreen}>
			<View style={{margin: 10}}>
				<Text style={css.text.bigBodyText}>
					Active Orders
				</Text>
			</View>
			<FlatList
            style={css.flatlist.container}
            data={activeOrders}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
              <OrderHistItem style={css.text.itemText} order={item} />
            }
          />
		</View> 

      return (
        <View style={css.screen.defaultScreen}>

          {/* If there are no active orders, do not display the flatlist */}
          {activeOrders.length > 0 ? pendingOrders : null}

			{/* Always displaying previous orders */}
			<View style={{margin: 10}}>
				<Text style={css.text.bigBodyText}>
					Previous Orders
				</Text>
			</View>
			
          <FlatList
            style={css.flatlist.container}
            data={orders}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
              <OrderHistItem style={css.text.itemText} order={item} />
            }
          />
        </View>
      )
    }
  }

}

