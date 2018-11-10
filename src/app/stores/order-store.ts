import { types, destroy } from "mobx-state-tree";
import { Location } from "./vendorStore";

const OrderItem = types
.model('OrderItem' , {
    item: types.string,
    quantity: types.number
})

 const Order = types
.model('Order', {
    location: Location,
    items: types.array(OrderItem),
    vendor: types.string,
    user: types.string
})

export const OrderStoreModel = types
.model('OrderStoreModel', {
    orders : types.array(Order)
})

 export type OrderStore = typeof OrderStoreModel.Type
