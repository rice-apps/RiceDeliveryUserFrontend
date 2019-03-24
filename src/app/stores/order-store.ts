import { types } from "mobx-state-tree"
import { Location } from "./location-store"
import gql from "graphql-tag";
import { getOrderTime } from '../screens/util';
import { client } from '../main';

const GET_ORDERS = gql`
  query getUserOrder($user_netid: String) {
    user(netID: $user_netid){
      orders{
        id
        amount
        created
        customer
        email
        paymentStatus
        orderStatus{
          pending
          onTheWay
          fulfilled
          unfulfilled
        }
        location{
          _id
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

export const OrderItem = types.model("OrderItem", {
  amount: types.number,
  description: types.string,
  parent: types.maybe(types.string),
  quantity: types.maybe(types.number)
})

export const OrderStatus = types.model("OrderStatus", {
  pending: types.Date, 
  onTheWay: types.maybe(types.Date), 
  fulfilled: types.maybe(types.Date), 
  unfulfilled: types.boolean
})

export const Order = types.model("Order", {
  id: types.string,
  amount: types.number,
  created: types.number,
  customer: types.string,
  email: types.string,
  items: types.array(OrderItem),
  orderStatus: OrderStatus,
  paymentStatus: types.string, 
  location: Location
});

export const OrderModel = types.model("OrderModel", {
  active: types.array(Order),
  previous: types.array(Order)
})
.actions(
  (self) => ({
    async getOrders(netid) {
      let data = await client.query({
        query: GET_ORDERS,
        // variables: {$user_netid: this.props.rootStore.userStore.user.netID}
        variables: {
          "user_netid": netid
        }
      });
      var orders = data.data.user[0].orders;
      orders.sort((o1, o2) => {
        return getOrderTime(o2).getTime() - getOrderTime(o1).getTime();
      });
      console.log(orders);
      self.setActiveOrders(orders.filter(item => !item.orderStatus.fulfilled));
      self.setPreviousOrders(orders.filter(item => item.orderStatus.fulfilled));
    },
    setActiveOrders(orders) {
      self.active = orders;
    },
    setPreviousOrders(orders) {
      self.previous = orders;
    }
  })
)

//  export type OrderStore = typeof OrderStoreModel.Type
//  export type OrderItemStore = typeof OrderItem.Type
