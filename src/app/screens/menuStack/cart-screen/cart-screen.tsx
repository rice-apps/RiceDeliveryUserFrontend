import * as React from 'react'
import { View, Text, FlatList, SectionList } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'
import { CartItem, mockCart } from '../../../components/temporary-mock-order';
import { Divider } from 'react-native-elements';
import { CartScreenItem } from '../../../components/cart-item';
import { inject, observer } from 'mobx-react'; 
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { Observer } from 'mobx-react/native';

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
    
  renderItems = ({item}) => {

    var cartItemAttributes = this.parseCartItemAttributes(item);
    var cartItemAttributesStr = cartItemAttributes.join(',\xa0') + " " + item.productName.toString(); 
    return (
    <Observer>
      {() => 
        <CartScreenItem 
          text={{
            left: item.quantity.toString(),
            middle: cartItemAttributesStr,
            right: `$${(item.price / 100).toString()}`
          }}
        />
        }
    </Observer>
    )
  }

  // Returns the array of the attribute values for a cartItem
  parseCartItemAttributes = (cartItem) => {
      return [cartItem.attributes.map((attr) => attr.value)];
  }

  renderExtraInfo = ({ item, index, section }) => (
    <CartScreenItem key={index} text={item} />
  )
  
  render() {

    let { rootStore } = this.props;
    // let arr = Array.from(rootStore.cartStore.cartMap.toJS().entries()).filter(pair => pair[1].quantity > 0)
    let arr = Array.from(rootStore.cartStore.cart.flatMap((product) => {
        return product.cartItems.filter((cartItem) => cartItem.quantity > 0);
    }))
    let deliveryCost = 1.99;
    let subtotalCost = arr.reduce((previous, item) => previous + (item.quantity * (item.price / 100.0)), 0)
    let subtotalData = {
      left: "",
      middle: "Subtotal",
      right: "$" + subtotalCost
    }
    let deliveryData = {
        left: "",
        middle: "Delivery",
        right: "$" + deliveryCost
      }

    return (
      
      <View style={[css.screen.defaultScreen, {height: "100%"}]}>
        <SectionList
          style={css.flatlist.container}
          renderItem={this.renderExtraInfo}
          sections={[
            { title: 'Title1', data: arr, renderItem: this.renderItems },
            { title: 'Title2', data: [subtotalData, deliveryData], },
          ]}
        />

        <Divider style={css.screen.divider} />
        <PrimaryButton
            title ={`Checkout $${subtotalCost + deliveryCost}`}
            onPress = {this.checkoutPush}
          />

      </View>
      )
  }
}