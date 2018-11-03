import { types, destroy } from "mobx-state-tree";
import { MenuItem } from './vendorStore';

const OrderItem = types
.model('OrderItem', {
    item: MenuItem,
    quantity: types.number
})

export const CartStoreModel = types
.model('CartStoreModel', {
    cartItems : types.array(OrderItem)
})

 export type CartStore = typeof CartStoreModel.Type