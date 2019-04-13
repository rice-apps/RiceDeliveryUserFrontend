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
const CHECK_SKU = gql`
query checkSKU($vendorName: String!, $sku:String!){
  sku(vendorName: $vendorName, sku: $sku){
    id
    inventory{
      value
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
        async checkAllCartItems(){
          let invalidItems = []
          let cartItemsArr = []
          self.cart.map((cartItem) => {
            let status = client.query({
              query: CHECK_SKU,
              variables: {
                "vendorName":"East West Tea",
                "sku":cartItem.sku
              }
            })
            invalidItems.push(status)
            cartItemsArr.push(cartItem)
          })
          let res = await Promise.all(invalidItems).then(res => {
            console.log("first: " + JSON.stringify(res))
            for (let i = 0; i < res.length ; i++){
              if (res[i].data.sku.inventory.value === "in_stock"){
                console.log(cartItemsArr.length)
                cartItemsArr = cartItemsArr.filter(item => item.sku != res[i].data.sku.id)
                console.log(cartItemsArr.length)

              }
            }
          })

          if (cartItemsArr.length > 1)

          console.log("third: " + JSON.stringify(invalidItems))

          cartItemsArr.map(x => console.log(x))
          console.log("return items: " + cartItemsArr)
          return cartItemsArr
        },
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

          /* Returns the orderID of the created order if successful */
          if (order.data.createOrder.id !== null) {
            return order.data.createOrder.id;
          } else {
            return null;
          }
        },
        removeAllItems() {
          while (self.cart.length > 0) {
            self.cart.pop()
            
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