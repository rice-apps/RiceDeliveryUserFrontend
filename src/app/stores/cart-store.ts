import { types, destroy, getRoot } from "mobx-state-tree";
import { MenuItem } from './vendorStore';
import { client } from '../main';
import gql from "graphql-tag";
import { RootStore } from "../root-store";

// Function to send the cart to the backend and create orders.
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
      _id
    }
  }
`;

const GET_MENU_ITEM = gql`
  query getMenuItem($itemId: String) {
    getMenuItem(itemId: $itemId) {
      name 
      description
    }
  }
`;

const OrderItem = types
.model('OrderItem', {
    itemID: types.string,
    quantity: types.number,
    price: types.number
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
        async placeOrder(vendorId) {
            // Get root store since we want the current user
            let { userStore } : RootStore = getRoot(self);
            const order = await client.mutate({
                mutation: POST_CART,
                variables: {
                    cart: self,
                    userId: userStore.users[0]._id,
                    location: userStore.users[0].defaultLocation,
                    vendorId: vendorId
                }
            });
            return order;
        }
    }),
)

 export type CartStore = typeof CartStoreModel.Type