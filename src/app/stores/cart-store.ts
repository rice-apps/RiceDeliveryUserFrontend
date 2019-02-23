import { types, destroy, getRoot } from "mobx-state-tree";
import gql from 'graphql-tag'
import { client } from "../main";
import { MenuItem } from './vendor-store';
import { RootStore } from "./root-store";


// GraphQL Mutations
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
        _id
    }
  }
`;

const SKUAtributesModel = types.model("SKUAttributeModel", {
  key: "",
  value: ""
})
const CartItemModel = types.model("CartItemModel", {
  productName: "", 
  productID: "",
  sku: "", 
  attributes: types.array(SKUAtributesModel)
})
export const CartStoreModel = types
.model('CartStoreModel', {
    cart: types.optional(types.array(CartItemModel), [])
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
 export type CartItem = typeof CartItemModel.Type
 export type SKUAtributes = typeof SKUAtributesModel.Type