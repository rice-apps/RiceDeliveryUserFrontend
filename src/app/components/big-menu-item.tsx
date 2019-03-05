import * as React from 'react'
import { Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import * as css from '../screens/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartItem } from '../stores/cart-store'
import { inject, observer } from 'mobx-react';
import { client } from '../main';
import gql from 'graphql-tag';
import { MenuScreenItem } from './menu-item';
import { SmallMenuScreenItem } from './small-menu-item';

interface BigMenuScreenItemProps {
    product : any
}

@inject("rootStore")
@observer
export class BigMenuScreenItem extends React.Component<BigMenuScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            toggleDrop : false,
            client: client
        }
        console.log("this.props.product");
        console.log(this.props.product);
        this.onTouchablePress = this.onTouchablePress.bind(this);
    }
    
    onTouchablePress() {
        this.setState({
            toggleDrop : !this.state.toggleDrop
        })
    }

    render() {
        let {cartItems} = this.props.product;

        let smallItems = 
        <View>
            <FlatList
            style={css.flatlist.container}
            data= {cartItems}
            keyExtractor={(item, index) => item.sku}
            renderItem={(item) => {
                return (
                    <SmallMenuScreenItem product={item.item}/>
                )
            }}
            />
        </View>

        return (
            <View>
                <TouchableHighlight onPress= {this.onTouchablePress}>
                    <View style={css.container.bigMenuItem}>
                        <Text style={css.text.bodyText}> {this.props.product.productName} </Text>
                    </View>
            </TouchableHighlight>
            
            {this.state.toggleDrop ? smallItems : null}
            </View>
        )
    }
}
