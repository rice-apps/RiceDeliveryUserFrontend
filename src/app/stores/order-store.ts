import { types, flow} from "mobx-state-tree"
import { Location } from "./vendor-store"
import gql from "graphql-tag";
import { getOrderTime } from '../screens/util';
import { client } from '../main';
import { toJS } from "mobx";

const GET_ORDERS = gql`
  query getUserOrder($user_netid: String, $starting_after: String) {
    user(netID: $user_netid){
      orders(starting_after: $starting_after){
        id
        amount
        created
        customer
        email
        paymentStatus
        orderStatus{
          pending
          arrived
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
  location: Location,
})

export const OrderModel = types.model("OrderModel", {
  pending: types.array(Order),
})
.actions(
  (self) => ({
    getOrders: flow(function *  getOrders(netid, starting_after) {
      const variables = {"user_netid": netid}
      console.log(toJS(self.pending))
      console.log(starting_after)
      if (starting_after !== null) variables.starting_after = starting_after;
      let data = yield client.query({
        query: GET_ORDERS,
        variables
      });
      console.log(data.data)
      if (data.data.user[0].orders.length === 0) return []
      self.pending = (starting_after === null) ? data.data.user[0].orders : self.pending.concat(data.data.user[0].orders)
      return self.pending
    }),
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
