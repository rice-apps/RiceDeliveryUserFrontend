import { types, destroy, getRoot } from "mobx-state-tree"
import gql from "graphql-tag"
import { client } from "../main"
import { MenuItem } from "./vendor-store"
import { RootStore } from "./root-store"


// GraphQL Mutations
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
        _id
    }
  }
`

const CREATE_ORDER = gql`
  mutation createOrderShort($netID: String!, $locationName: String!, $vendorName: String!, $data: [CreateOrderInput!]!) {
    createOrder(
      netID: $netID,
      locationName: $locationName,
      vendorName: $vendorName,
      data: $data) 
      {
      id
    }
  }
 `
const CREATE_ORDER_2 = gql`
mutation createOrder ($netID: String!, $locationName: String!, $vendorName: String!, $data: [CreateOrderInput!]!) {
  createOrder(
    netID: $netID,
    locationName: $locationName,
    vendorName: $vendorName,
    data: $data) 
    {
    id
    amount
    charge
    created
    items {
      parent
      amount
    }
    orderStatus{
      _id
      pending
      onTheWay
      fulfilled
      unfulfilled
      refunded
    }
  }
 }
 `

const PAY_ORDER = gql`
mutation payOrder ($data: UpdateOrderInput!, $creditToken: String!) {
  payOrder(
   	data: $data, 
    creditToken: $creditToken
  ) 
    {
    id
    amount
    charge
    created
    items {
      parent
      amount
    }
    orderStatus{
      _id
      pending
      onTheWay
      fulfilled
      unfulfilled
      refunded
    }
  }
 }
 `
 


export const SKUAtributesModel = types.model("SKUAttributeModel", {
  key: "",
  value: "",
})

export const CartItemModel = types.model("CartItemModel", {
  productName: "", 
  productID: "",
  sku: "", 
  description: "",
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
.model("CartStoreModel", {
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
        async createOrder(netID, locationName, vendorName, data) {
          let order = await client.mutate({
            mutation: CREATE_ORDER,
            variables: {
                netID: netID,
                locationName: locationName,
                vendorName: vendorName,
                data: data
            }
          });
          if (order) {
            return true;
          } else {
            return false;
          }
        },
        async payOrder(data, creditToken) {
          let order = await client.mutate({
            mutation: PAY_ORDER,
            variables: {
                data: data,
                creditToken: creditToken,
            },
          })
        },
    }),
)

 export type CartStore = typeof CartStoreModel.Type
 export type CartItem = typeof CartItemModel.Type
 export type SKUAtributes = typeof SKUAtributesModel.Type