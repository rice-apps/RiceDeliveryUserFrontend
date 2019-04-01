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

const CREATE_ORDER = gql
`mutation createOrderShort ($netID: String!, $defaultLocationName: String!, $vendorName: String!, $data: [CreateOrderInput!]!) {
  createOrder(
    netID: $netID,
    defaultLocationName: $defaultLocationName,
    vendorName: $vendorName,
    data: $data) 
    {
    id
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
  note: "",
  attributes: types.array(SKUAtributesModel), 
  price: 0
})

export const ProductModel = types.model("ProductModel", {
  productName: "", 
  cartItems: types.array(CartItemModel),
}).actions(self => ({
  addToCartItems(cartItem) {
    self.cartItems.push(cartItem);
    },
}))


export const CartStoreModel = types
.model('CartStoreModel', {
    cart: types.optional(types.array(CartItemModel), []),
})
.actions(
    (self) => ({
        addToCart(CartItemModel) {
            self.cart.push(CartItemModel)
        },
        removeFromCart(CartItemModel) { 
          self.cart.remove(CartItemModel);
        },
        async createOrder(netID, defaultLocationName, vendorName, data) {
          let order = await client.mutate({
            mutation: CREATE_ORDER,
            variables: {
                netID: netID,
                defaultLocationName: defaultLocationName,
                vendorName: vendorName,
                data: data
            }
          });
        }
    }),
)

 export type CartStore = typeof CartStoreModel.Type
 export type CartItem = typeof CartItemModel.Type
 export type SKUAtributes = typeof SKUAtributesModel.Type