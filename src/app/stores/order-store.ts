import { types } from "mobx-state-tree"

export const OrderItem = types.model("OrderItem", {
  amount: types.number,
  description: types.string,
  parent: types.string,
  quantity: types.number
})

export const OrderStatus = types.model("OrderStatus", {
  pending: types.Date, //Might not convert int to date.
  onTheWay: types.Date, //Might not convert int to date.
  fulfilled: types.Date, //Might not convert int to date.
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
