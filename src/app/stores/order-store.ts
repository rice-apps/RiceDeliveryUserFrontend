import { types } from "mobx-state-tree"
import { Location } from "./location-store"

export const OrderItem = types.model("OrderItem", {
  amount: types.number,
  description: types.string,
  parent: types.string,
  quantity: types.number
})

export const OrderStatus = types.model("OrderStatus", {
  pending: types.Date, 
  onTheWay: types.Date, 
  fulfilled: types.Date, 
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
})

export const OrderModel = types.model("OrderModel", {
  pending: types.array(Order)
})

//  export type OrderStore = typeof OrderStoreModel.Type
//  export type OrderItemStore = typeof OrderItem.Type
