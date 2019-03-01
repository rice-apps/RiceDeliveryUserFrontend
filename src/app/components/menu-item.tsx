import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';
import * as css from '../screens/style';
import { Product } from '../components/temporary-mock-order';
import { CartItem } from '../stores/cart-store'
import { inject, observer } from 'mobx-react';
import { client } from '../main';
import gql from 'graphql-tag';
interface MenuScreenItemProps {
    product : any
}

const SKU_QUERY = gql`
    query getSKU($sku: String!, $vendorName: String!){
        sku(sku: $sku, vendorName: $vendorName) {
            inventory{
            value
            }
        }
        
    }
`
@inject("rootStore")
@observer
export class MenuScreenItem extends React.Component<MenuScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            client: client
        }
    }
    
    onIncrementHandler = async() => {
        // const inventory = await client.query({
        //     query: SKU_QUERY,
        //     variables: {
        //         sku: this.props.product[1].sku,
        //         vendorName: "East West Tea"
        //     }
        // })
        this.props.product[1].incrementQuantity()

    }

    onDecrementHandler = async() => {
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
