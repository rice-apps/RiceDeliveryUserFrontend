import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';
import * as css from '../screens/style';
import { Product } from '../components/temporary-mock-order';
import { CartItem } from '../stores/cart-store'
import { inject, observer } from 'mobx-react';
interface MenuScreenItemProps {
    product : any
}

// Should we always define the input props/state for components instead of <any, any>???

@inject("rootStore")
@observer
export class MenuScreenItem extends React.Component<MenuScreenItemProps, any> {
    constructor(props) {
        super(props);
    }

    onIncrementHandler = () => {
        this.props.product[1].incrementQuantity()

    }

    onDecrementHandler = () => {
        let quantity = this.props.product[1].quantity
        if (quantity > 0) {
            this.props.product[1].decrementQuantity()
        }
    }

    render() {
        return (
            <View style={css.container.menuItem}>
                <Text style={css.text.bodyText}> {this.props.product[0]} </Text>
                <Button
                    title="+"
                    onPress={this.onIncrementHandler}
                    />
                <Button 
                    title = "-"
                    onPress={this.onDecrementHandler}
                />
                <Text style={css.text.bodyText}>
                    {this.props.product[1].quantity}
                </Text>     
            </View>
        )
    }
}
