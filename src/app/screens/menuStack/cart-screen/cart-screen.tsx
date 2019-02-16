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
    console.log(cart);

    return (
      <View style={css.screen.defaultScreen}>
        <Text style={css.text.headerText}>
            CartScreen
        </Text> 

        <FlatList 
            // style={}
            data= { cart }
            keyExtractor={(item, index) => item.product._id}
            renderItem={({item}) => 
                <CartScreenItem cartItem={item}/>
            }
        />

        <Divider style={css.screen.divider} />
        
        <PrimaryButton
            title ="Checkout"
            onPress = {this.checkoutPush}
          />

      </View>
      )
  }
}
