import * as React from 'react'
import { View, Text, FlatList } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'
import { CartItem, mockCart } from '../../../components/temporary-mock-order';
import { Divider } from 'react-native-elements';
import { CartScreenItem } from '../../../components/cart-item';

interface CartScreenState {
  cart : CartItem[],
}

export class CartScreen extends React.Component<any, CartScreenState> {

  constructor(props) {
    super(props) 
    this.state = {
      cart: mockCart
    }
  }

  // Link to checkout screen
  checkoutPush = () => {
      this.props.navigation.navigate("Checkout")
    }
    

  render() {

    var { cart } = this.state;

    var subtotal = 0;
    var deliveryCost = 1.99;

    for ( let item of cart ) {
      let { quantity, sku } = item;
      let SKU = item.product.skuItems.filter((SKU, index, array) => SKU._id == sku)[0];
      subtotal += SKU.price * quantity;
    }

    return (
      <View style={css.screen.defaultScreen}>
        <FlatList 
            style={css.flatlist.container}
            data= { cart }
            keyExtractor={(item, index) => item.product._id}
            renderItem={({item}) => {

              var { quantity, product, sku } = item;
              var { name } = product;
              // Finding corresponding skuItem with this cart item.
              // Check if sku works? May index empty array.
              var SKU = product.skuItems.filter((SKU, index, array) => SKU._id == sku)[0];
              var price = SKU.price * quantity;

              return (
              <CartScreenItem 
              text={{
                left: quantity.toString(),
                middle: name,
                right: "$" + price.toString(),
              }}/>
              )
            }
            }
        />

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
