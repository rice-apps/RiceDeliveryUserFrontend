import { types, destroy } from "mobx-state-tree";

 const Order = types
.model('Order', {
    location: types.string,
    items: types.array(types.string),
    vendor: types.string,
    user: types.string
})

export const OrderStoreModel = types
.model('OrderStoreModel', {
    orders : types.array(Order)
})

 export type OrderStore = typeof OrderStoreModel.Type
