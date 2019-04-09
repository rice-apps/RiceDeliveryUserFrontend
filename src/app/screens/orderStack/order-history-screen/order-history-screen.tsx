import * as React from "react"
import { Text, Button, View, FlatList, ActivityIndicator } from "react-native"
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import * as css from "../../style"
// import Order, { mock_orders } from '../../../components/temporary-mock-order';
import OrderHistItem from "../../../components/order-hist-item"
import gql from "graphql-tag"
import { inject, observer } from "mobx-react"
import { client } from "../../../main"
import LoadingScreen from "../../loading-screen"
import { getOrderTime } from "../../util"
import { RootStore } from "../../../stores/root-store";

export const GET_ORDERS = gql`
  query getUserOrder($user_netid: String, $starting_after: String) {
    user(netID: $user_netid){
      orders(starting_after: $starting_after){
        id
        orderStatus{
          pending
          onTheWay
          fulfilled
          unfulfilled
        }
        paymentStatus
        location {
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

interface OrderHistryScreenprops {
  rootStore: RootStore
}
@inject("rootStore")
@observer
export class OrderHistoryScreen extends React.Component<OrderHistryScreenprops, any> {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      orders: {},
      idx: 0,
      endReached: false,
      refreshState: RefreshState.Idle,
    }
  }

  async getOrders(starting_after) {
    let netid = this.props.rootStore.userStore.user.netID;
    const variables = {
      "user_netid": netid
    }
    if (starting_after != null) variables.starting_after = starting_after;
	  return client.query({
      query: GET_ORDERS,
      variables: variables
    })
  }
  
  timer
  
  async componentWillMount() {
    const info = await this.getOrders(null)
	  var orders = info.data.user[0].orders
    this.setState({
      loading: false,
      orders: orders
    })
    this.timer = setInterval(()=> this.onRefresh(), 30000);
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }
  

  loadMore = async () => {
    if (!this.state.endReached) {
      await this.setState({refreshState: RefreshState.FooterRefreshing})
      const orders = (await this.getOrders(this.state.orders[this.state.orders.length - 1].id)).data.user[0].orders
      if (orders.length == 0) await this.setState({ endReached: true })
      await this.setState({refreshState: RefreshState.Idle, orders: this.state.orders.concat(orders)})
    } else {
      await this.setState({refreshState: RefreshState.NoMoreData})
    }
  }

  renderIf = (condition, component) => {
    if (condition) return component 
    return null;
  }

  renderFooter = () => 
      (<View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )

    renderEnd = () => (
        <View
          style={{
            paddingVertical: 10,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
          }}
        >
          <Text>End</Text>
        </View>
      )
  
  onRefresh = async() => {
    
    console.log("refreshing order history screen");
    // await this.setState({ refreshState: RefreshState.HeaderRefreshing, endReached: false})
	  const orders = (await this.getOrders(null)).data.user[0].orders;
    await this.setState({ refreshState: RefreshState.Idle, orders: orders })
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
	  let {orders} = this.state
      return (
        <View style={css.screen.defaultScreen}>
          <RefreshListView
            style={css.flatlist.container}
            data={orders}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => <OrderHistItem style={css.text.itemText} order={item} />}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onRefresh}
            onFooterRefresh={this.loadMore}
            footerRefreshingComponent={this.renderFooter}
            footerNoMoreDataComponent={<Text>All orders listed!</Text>}
          />
        </View>
      )
    }
  }
  

}

