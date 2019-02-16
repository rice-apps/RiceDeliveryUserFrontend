import { types, destroy, getRoot } from "mobx-state-tree";
import gql from 'graphql-tag'
import { client } from "../main";

// GraphQL Mutations
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
        _id
    }
  }
`;

export const CartStoreModel = types
.model('CartStoreModel', {
    
})
.actions(
    (self) => ({
        addToCart() {
            
        },
        removeFromCart() {

        },
        async createOrder() {
            
        }
    }),
)

 export type CartStore = typeof CartStoreModel.Type