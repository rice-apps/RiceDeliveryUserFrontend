import * as React from 'react'
import { View, Text, FlatList } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'
import { CartItem, mockCart } from '../../../components/temporary-mock-order';
import { Divider } from 'react-native-elements';
import { CartScreenItem } from '../../../components/cart-item';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';

interface CartScreenState {
  cart : CartItem[],
}

interface CartScreenProps {
  rootStore: RootStore,
  navigation: NavigationScreenProp<any, any>
}
@inject("rootStore")
@observer
export class CartScreen extends React.Component<CartScreenProps, CartScreenState> {

  constructor(props) {
    super(props) 
    this.state = {
      cart: this.props.navigation.getParam('cart', 'no_order_retrieved'),
    }
  }

  // Link to checkout screen
  checkoutPush = () => {
      this.props.navigation.navigate("Checkout")
    }
    

  render() {

    let { rootStore } = this.props;
    let map = rootStore.cartStore.cartMap
    let subtotal = 0;
    let deliveryCost = 1.99;

    map.forEach((value, key, map) => {
      subtotal += value.price / 100.0
    })
    return (
      <View style={css.screen.defaultScreen}>

        {/* <FlatList 
            style={css.flatlist.container}
            data={ this.props.rootStore.cartStore.cartMap.entries() }
            keyExtractor={(item, index) => item.}
            renderItem={({item}) => {

              // var { quantity, productID, sku } = item;
              // var { name } = product;
              // // Finding corresponding skuItem with this cart item.
              // // Check if sku works? May index empty array.
              // var SKU = product.skuItems.filter((SKU, index, array) => SKU._id == sku)[0];
              // var price = SKU.price * quantity;

              return (
              <CartScreenItem 
              text={{
                left: 
                middle: name,
                right: "$" + price.toString(),
              }}/>
              )
            }
            }
        /> */}

        <Divider style={css.screen.divider} />


        <CartScreenItem 
              text={{
                left: "",
                middle: "Subtotal",
                right: "$" + subtotal.toString(),
          }}/>
          <CartScreenItem 
              text={{
                left: "",
                middle: "Delivery",
                right: "$" + deliveryCost.toString(),
          }}/>
        
        <PrimaryButton
            title ="Checkout"
            onPress = {this.checkoutPush}
          />

      </View>
      )
  }
}
