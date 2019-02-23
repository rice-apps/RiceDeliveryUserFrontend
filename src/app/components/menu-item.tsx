import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';
import * as css from '../screens/style';
import { Product } from '../components/temporary-mock-order';
import { CartItem } from '../stores/cart-store'
interface MenuScreenItemProps {
    product : any
}

// Should we always define the input props/state for components instead of <any, any>???
export class MenuScreenItem extends React.Component<MenuScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }

    onIncrementHandler = () => {
        this.setState((state, props) => {
            return {
                quantity: state.quantity + 1
            }
        })
    }

    onDecrementHandler = () => {
        this.setState((state, props) => {
            return {
                quantity: state.quantity - 1
            }
        })
    }

    render() {
        var {name, images, description, skuItems} = this.props.product;
        return (
            <View style={css.container.menuItem}>
            {/* <View style={css.flatlist.vendorView}> */}
                    <Text style={css.text.bodyText}> {name} </Text>
                    <Button
                        title="+"
                        onPress={this.onIncrementHandler}
                     />
                    <Button 
                        title = "-"
                        onPress={this.onDecrementHandler}
                    />
                    <Text style={css.text.bodyText}>
                        {this.state.quantity}
                    </Text>
            </View>
        )
    }
}
