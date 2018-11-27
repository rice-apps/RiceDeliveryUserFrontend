import { types, destroy, getRoot } from "mobx-state-tree";
import gql from 'graphql-tag'
import { MenuItem } from './vendorStore';
import { RootStore } from "../root-store";
import { client } from "../main";

// GraphQL Mutations
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
        _id
    }
  }
`;

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
            console.log(self.cartItems);
        },
        removeFromCart(menuItemID) {
            let idx = self.cartItems.findIndex((menuItem) => menuItem.itemID == menuItemID)
            self.cartItems.splice(idx, 1)
            console.log(self.cartItems);
        },
        async createOrder() {
            const order = await client.mutate({
                mutation: POST_CART,
                variables: {
                    cart: { cart: self.cartItems },
                    userID: "5bd01994032993139cbbc845",
                    location: "Wiess Commons",
                    vendorID: "5bd01d4e2e964215214ad094"
                }
            });
            return order;
        }
    }),
)

 export type CartStore = typeof CartStoreModel.Type