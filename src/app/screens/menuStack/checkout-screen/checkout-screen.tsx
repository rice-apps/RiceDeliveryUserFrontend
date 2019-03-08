import * as React from 'react'
import { View, Text, Picker } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import { CartStoreModel } from "../../../stores/cart-store";
import { Dropdown } from 'react-native-material-dropdown';

console.disableYellowBox = true;
@inject("rootStore")
@observer
export class CheckoutScreen extends React.Component<any, any> {

  constructor(props) {
    super(props) 
    this.state = {
	  location : "Nowhere",
	  name : "Jonathan Cai",
	  email : "coolguy@gmail.com",
	  phone : "(123)456-789",
	  card : "123456789",
	  locationOptions : [],
	}
	this.createOrder = this.createOrder.bind(this);
  }

  createOrder = (netID, defaultLocation, vendorName, data) => {
    this.props.rootStore.cartStore.createOrder(netID, defaultLocation, vendorName, data);
    this.props.navigation.popToTop();
  };

  onPlaceOrderPress = () => {

  }

	componentDidMount() {
	var x = this.props.rootStore.vendorStore.vendors[0];
	console.log(x.locationOptions); 
	this.setState({
		locationOptions : x.locationOptions
	})
  }


  render() {

  let { rootStore } = this.props;
  // Just grabbing the first vendor right now
  let locationOptions = this.state.locationOptions.map(({name}) => {
	  return {
		  value : name 
		}
  });
//   console.log(locationOptions);
  
  var productItems = rootStore.cartStore.cart;
  // Get product items that have cart items with quantity > 0
  var nonEmptyProductItems = productItems.filter((productItem) => {
    return productItem.cartItems.filter((cartItem) => {
      return cartItem.quantity > 0;
    }).length > 0;
  });
  // Get cart items with quantity > 0
  var nonEmptyCartItems = nonEmptyProductItems.flatMap((productItem) => {
    return productItem.cartItems.filter((cartItem) => {
      return cartItem.quantity > 0;
    })
  });

  var orderInputs = nonEmptyCartItems.map((cartItem) => {
    return ({
      SKU : cartItem.sku,
      quantity : cartItem.quantity
    });
  });

//   console.log(orderInputs);

	let mockNetID = "jl23";
	let defaultLocation = "Wiess";
	let vendorName = "East West Tea";
	let data = orderInputs;

	let dropDownData = locationOptions;

	let {name, email, phone, card} = this.state;

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
          

            <Text style={css.text.headerText}>
                Delivery details
            </Text> 

			<View style= {{
				justifyContent : "space-between",
				flex : .3,
				flexDirection : "row",
				// borderWidth : 4,
				// borderColor : "red",
			}}>

				<Text style={css.text.bigBodyText}>
				Location
				</Text>

					<Dropdown
						containerStyle = {{
							width : 150,
							// height : 10
						}}
						// label='Location'
					data={dropDownData}
					/>
			</View>

            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>
              Payment
            </Text>

            <View style={css.container.checkoutScreenContainer}>
            <Text style={css.text.itemText}>
                    Name : {name}{"\n"}
                    Email : {email}{"\n"}
                    Phone : {phone}
                </Text>
            </View>

            <View style={css.container.checkoutScreenContainer}>
                <Text>
                    Card Number : {card}
                </Text>
            </View>

            <View>

              <PrimaryButton
                    title = "Place Order"
                    onPress = {this.onPlaceOrderPress}
                />
            </View>
            
        </View>

      </View>
      )
  }
}
