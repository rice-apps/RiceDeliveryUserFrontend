import * as React from "react"
import { MenuItem as MenuItemModel } from "../../../app/stores/vendorStore"
import { View, Text, TextStyle, TouchableHighlight, FlatList } from "react-native"
import { CartStore } from "../../../app/stores/cart-store"
import { OrderItemStore, OrderStore } from "../../../app/stores/order-store";
import { client } from "../../../app/main";
import gql from "graphql-tag";

const BOLD: TextStyle = { fontWeight: "bold" }
const UNSELECTED_STYLE: TextStyle = {
    ...BOLD,
    fontSize: 25,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 1.5,
    color: "white",
}
const SELECTED_STYLE: TextStyle = {
    ...UNSELECTED_STYLE,
    backgroundColor: "grey",
}

const GET_MENU_ITEM = gql`
  query getMenuItem($itemId: String) {
    getMenuItem(itemId: $itemId) {
      name 
      description
    }
  }
`

// Letting each menuItem have access to entire cart store
export interface OrderProps {
    order?: Number,
    orderStore?: OrderStore
}

export class Order extends React.Component<OrderProps, {}> {
    // Initialize state to reflect the cart store
    constructor(props) {
        super(props);
    }

    _renderItems(items) {
        const menuItems = []
        items.forEach(async (item) => {
            console.log(item.item);
            const menuItem = await client.query({
                query: GET_MENU_ITEM,
                variables: {itemId: item.item.id}
            });
            menuItems.push(menuItem.data.getMenuItem)
        });
        return menuItems;
    }

    render() {
        let orderNum = this.props.order;
        let order = this.props.orderStore.orders[orderNum];
        let { items, location, user, vendor } = order;
        if (items != undefined) {
            items = this._renderItems(items);
        }
        console.log(items);
        // Currently, only displaying first element
        return (
            <View>
                <Text>{user}</Text>
                <FlatList
                data={items}
                renderItem={({ item, index }) => <Text key={index}>{item ? item.name : ""}</Text>}
                keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
            </View>
        )
    }
}