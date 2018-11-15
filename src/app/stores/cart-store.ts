import { types, destroy, getRoot } from "mobx-state-tree";
import { MenuItem } from './vendorStore';
import { RootStore } from "../root-store";

const OrderItem = types
.model('OrderItem', {
    itemID: types.string,
    quantity: types.number
})

export const CartStoreModel = types
.model('CartStoreModel', {
    cartItems : types.array(OrderItem)
})
.actions(
    (self) => ({
        addToCart(menuItemID) {
            self.cartItems.push({itemID: menuItemID, quantity : 1})
        },
        removeFromCart(menuItemID) {
            let idx = self.cartItems.findIndex((menuItem) => menuItem.itemID == menuItemID)
            self.cartItems.splice(idx, 1)
        },
    }),
)

 export type CartStore = typeof CartStoreModel.Type