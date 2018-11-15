import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, FlatList } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../bullet-item"
import { Api } from "../../../services/api"
import { save } from "../../../lib/storage"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../app/root-store"
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import ApolloClient from "apollo-boost";
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
// Just for testing purposes disable yellowbox warnings
console.disableYellowBox = true;

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}

interface CartScreenProps  {
  rootStore?: RootStore
}

interface CartScreenState {
  cart?: Cart
}
// Function to send the cart to the backend and create orders.
const POST_CART = gql`
  mutation CartMutation($cart: CartInput!, $userID: String!, $location: String!, $vendorID: String!) {
    addOrder(cart: $cart, userID: $userID, location: $location, vendorID: $vendorID) {
      _id
    }
  }
  ` 
const GET_MENU_ITEM = gql`
  query getMenuItem($itemId: String) {
    getMenuItem(itemId: $itemId) {
      name 
      description
    }
  }
`
interface CartItems {
  menuId: String,
  quantity: number
  price: number
}
interface Cart {
  cart: CartItems[]
}

const MOCK_CART: Cart = {
  cart: [
    {menuId: "5bd01d4e2e964215214ad0a3",
    quantity: 1,
    price: 5.00
    },
    {menuId: "5bd01d4e2e964215214ad0a6", 
    quantity: 1,
    price: 7.00
    },
    {menuId:  "5bd01d4e2e964215214ad0af", 
    quantity: 4,
    price: 4.00
    }
  ]
}


/**
 * inject finds root store in mobx state tree
 * observer lets us read things from the store
 */
@inject("rootStore")
@observer 
export class CartScreen extends React.Component<CartScreenProps, CartScreenState> {
  constructor(props: CartScreenProps) {
    super(props)
    this.state = {
      cart: MOCK_CART, 
    }
    console.log("SET STATE", this.state)
  }
  store = this.props.rootStore

  demoReactotron = async () => {
    console.log(this.state)
    console.tron.log("Your Friendly tron log message")
    console.tron.logImportant("I am important")
    console.tron.display({
      name: "DISPLAY",
      value: {
        numbers: 1,
        strings: "strings",
        booleans: true,
        arrays: [1, 2, 3],
        objects: {
          deeper: {
            deeper: {
              yay: "👾",
            },
          },
        },
        functionNames: function hello() {},
      },
      preview: "More control with display()",
      important: true,
      image: {
        uri:
          "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
      },
    })
    // make an API call for the demo
    // Don't do API like this, use store's API
    const demo = new Api()
    demo.setup()
    demo.getUser("1")
    // Let's do some async storage stuff
    await save("Cool Name", "Boaty McBoatface")
  }

  /**
   * Function to get information about the menuitems in the cart.
   */
  getMenuItems() {
    const menuItems = []
    this.state.cart.cart.forEach(async (item) => {
      const menuItem = await client.query({
        query: GET_MENU_ITEM,
        variables: {itemId: item.menuId}
      })
      menuItems.push(menuItem.data)
    })
    return menuItems
  }

  async generateOrder()  {
    const order =  await client.mutate({
      mutation: POST_CART,
      variables: {cart: this.state.cart, userID: "5bd01994032993139cbbc845", location: "Wiess Commons", vendorID: "5bd01d4e2e964215214ad094" }
    })
    return order
  }
  render() {
    return (
      <View style={FULL}>
        <Wallpaper />
        <SafeAreaView style={FULL}>
            <View>
              <Button
                style={DEMO}
                textStyle={DEMO_TEXT}
                text="Confirm Order"
                onPress={() => this.generateOrder()}
              />            
            </View>
        </SafeAreaView>
      </View>
    )
  }
}
