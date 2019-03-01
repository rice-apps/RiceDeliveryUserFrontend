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

export const SKUAtributesModel = types.model("SKUAttributeModel", {
  key: "",
  value: ""
})

export const CartItemModel = types.model("CartItemModel", {
  productName: "", 
  productID: "",
  sku: "", 
  attributes: types.array(SKUAtributesModel), 
  quantity: 0,
  price: 0
}).actions(self =>({
  incrementQuantity() {    
    self.quantity += 1
  }, 
  decrementQuantity() {
    self.quantity -= 1
  }
}))


export const CartStoreModel = types
.model('CartStoreModel', {
    cart: types.optional(types.array(CartItemModel), []),
    cartMap: types.optional(types.map(CartItemModel), {})
})
.actions(
    (self) => ({
        addCartIem(name, CartItemModel) {
          self.cartMap.set(name, CartItemModel)
        },
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