import * as React from "react"
import { Text, View, StyleSheet, TouchableHighlight, Button } from "react-native"
import * as css from "../screens/style"
import Icon from "react-native-vector-icons/MaterialIcons"
import { CartItem } from "../stores/cart-store"
import { inject, observer } from "mobx-react"
import { client } from "../main"
import gql from "graphql-tag"
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
        super(props)
        this.state = {
            client: client,
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
                <View>
                    <Text style={css.text.bodyText}> {this.props.product[0]} </Text>
                </View>

                <View>
                    <View style={{flex : 1, flexDirection : "row",
                        justifyContent: "flex-end"}}>

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

                        <Text style={css.text.bodyText}>
                            {this.props.product[1].quantity}
                        </Text>

                    </View>
                </View>

            </View>
        )
    }
}
