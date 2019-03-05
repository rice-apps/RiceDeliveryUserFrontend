import * as React from 'react'
import { Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import * as css from '../screens/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartItem } from '../stores/cart-store'
import { inject, observer } from 'mobx-react';
import { client } from '../main';
import gql from 'graphql-tag';

interface SmallMenuScreenItemProps {
    product : any
}

@inject("rootStore")
@observer
export class SmallMenuScreenItem extends React.Component<SmallMenuScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            client: client
        }
        console.log("this.props.product");
        console.log(this.props.product);
    }
    
    onIncrementHandler = async() => {
        this.props.product.incrementQuantity()
    }

    onDecrementHandler = async() => {
        let quantity = this.props.product.quantity
        if (quantity > 0) {
            this.props.product.decrementQuantity()
        }
    }

    render() {
        let { attributes, quantity } = this.props.product;
        return (
            <View style= {css.container.menuItem}>
                <Text style={css.text.smallText}> {attributes[0].value + ", " + attributes[1].value} </Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent:"flex-end"}}>
                    <TouchableHighlight 
                    style = {css.container.iconHighlight}
                    onPress={this.onIncrementHandler}>
                            <Icon name="add" size={25} color="black" />
                    </TouchableHighlight>

                    <TouchableHighlight 
                    style = {css.container.iconHighlight}
                    onPress={this.onDecrementHandler}>
                            <Icon name="remove" size={25} color="black" />
                    </TouchableHighlight>
                    <Text style={css.text.smallText}> {quantity} </Text>
                </View>
            </View>
        )
    }
}
