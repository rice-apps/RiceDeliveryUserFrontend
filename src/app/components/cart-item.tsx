import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';
import { Observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { inject, observer } from 'mobx-react'; 
import { RootStore } from '../stores/root-store';


interface CartScreenItemProps {
    rootStore: RootStore,
    cartItem : any,
    text : {
        // left : string
        middleBig : string
        middleSmall : string
        middleSmallTwo : string
        right : string
    }
}

@inject("rootStore")
@observer
// Should we always define the input props/state for components instead of <any, any>???
export class CartScreenItem extends React.Component<CartScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart() {
        this.props.rootStore.cartStore.removeFromCart(this.props.cartItem);
    }

    render() {
        let icon = 
        <TouchableHighlight onPress={this.removeFromCart}>
            <Icon name="close" size={30} color="black" />
        </TouchableHighlight>


        let empty = 
        <View style={{height : 30, width : 30}}>

        </View>


        var {right, middleBig, middleSmall, middleSmallTwo} = this.props.text;
        return (
            <View style={{
                padding: 10,
                width: "100%",
                flex: 1,
                backgroundColor: "white",
                flexDirection: 'row',
                justifyContent: 'space-between',
                // borderWidth : 5,
                // borderColor : 'red'
              }}>

                { this.props.cartItem ? icon : empty}

                        <View style={{
                            width : "10%"
                        }}>
                            {/* <Text style={css.text.bodyText}>
                                    {left}
                            </Text> */}
                        </View>

                        <View style={{
                            // borderWidth: 5,
                            // borderColor: "red",
                            flex : 1,
                            flexDirection: "column"
                        }}>
                            <Text style={css.text.bodyText}>
                                {middleBig}
                            </Text>
                            <Text>
                                {middleSmall}
                            </Text>
                            <Text>
                                {middleSmallTwo}
                            </Text>
                        {/* </View> */}
                </View>


            <View style={{
                width : "20%",
            }}>
                    <Text style={css.text.bodyText}>
                        {right}
                    </Text>
              </View>
              </View>
        
        )
    }
}
