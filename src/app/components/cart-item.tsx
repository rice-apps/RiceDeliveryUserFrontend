import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';
import { CartItem } from '../components/temporary-mock-order';


interface CartScreenItemProps {
    cartItem : CartItem
}

// Should we always define the input props/state for components instead of <any, any>???
export class CartScreenItem extends React.Component<CartScreenItemProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        var { quantity, product } = this.props.cartItem;
        // var price = quantity * product.skuItems
        
        return (
            <View style={css.container.cartItem}>
                <Text style={css.text.bodyText}> {quantity}    {product.name} </Text>
            </View>
        )
    }
}
