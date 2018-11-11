import * as React from "react"
import { MenuItem as MenuItemModel } from "../../../app/stores/vendorStore"
import { View, Text, TextStyle, TouchableHighlight } from "react-native"
import { CartStore } from "../../../app/stores/cart-store"

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

// Letting each menuItem have access to entire cart store
export interface MenuItemProps {
    menuItem?: MenuItemModel;
    cartStore?: CartStore;
}

export class MenuItem extends React.Component<MenuItemProps, { selected: Boolean }> {
    // Initialize state to reflect the cart store
    constructor(props) {
        super(props);
        let { cartItems } = this.props.cartStore;
        let isInCart = cartItems.findIndex((item) => item.itemID == props.menuItem.id)
        this.state = {selected : isInCart == -1 ? false : true };
    }

    // Toggle select to remove/add to cart
    _onPressButton() {
        let { addToCart, removeFromCart } = this.props.cartStore;
        let { menuItem } = this.props;
        let { selected } = this.state;
        this.setState({selected: !selected});
        this.state.selected ? removeFromCart(menuItem.id) : addToCart(menuItem.id);
    }

    render() {
        let name = this.props.menuItem.name;
        // Currently, only displaying first element
        let price = this.props.menuItem.prices[0].price;
        let { selected } = this.state;
        return (
            <View>
                {/* Must bind the button to this component */}
                <TouchableHighlight onPress = {this._onPressButton.bind(this)}>
                <Text style = {selected ? SELECTED_STYLE : UNSELECTED_STYLE}>{ name } { price } </Text>
                </TouchableHighlight>
            </View>
        )
    }
}