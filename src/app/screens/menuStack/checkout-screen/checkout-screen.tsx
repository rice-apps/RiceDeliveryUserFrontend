import * as React from 'react'
import { View, Text, Picker } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx"
import { CartStoreModel } from "../../../stores/cart-store"

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
    }
  }

  createOrder(netID, defaultLocation, vendorName, data) {
    this.props.rootStore.cartStore.createOrder(netID, defaultLocation, vendorName, data);
  };


  render() {

  let { rootStore } = this.props;
  let arr = Array.from(rootStore.cartStore.cartMap.toJS().entries()).filter(pair => pair[1].quantity > 0);
  let mockNetID = "jl23";
  let defaultLocation = "Weiss";
  let vendorName = "East West Tea";
  let data = arr.map(x => ({"SKU": x[1].sku, "quantity": x[1].quantity}));

	let {name, email, phone, card} = this.state;

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
          

            <Text style={css.text.headerText}>
                Delivery details
            </Text> 

            <Text style={css.text.bigBodyText}>
              Location
            </Text>

            <View style={
				{flex : 1,
					height: 10, 
					width: 110, 
				}
			}>
				<Picker
					selectedValue={this.state.location}
					style={{
						height: 1, 
						width: 100, 
						padding: 0, 
						margin: 0,
					}}
					onValueChange={(itemValue, itemIndex) =>
					this.setState({location: itemValue})
					}>
					<Picker.Item label="Jones" value="jones" />
					<Picker.Item label="Martel" value="martel" />
					<Picker.Item label="Brown" value="brown" />
					<Picker.Item label="McMurtry" value="mcmurtry" />
					<Picker.Item label="Duncan" value="duncan" />
				</Picker>
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
                        onPress = {this.createOrder(mockNetID, defaultLocation, vendorName, data)}
                    />
            </View>
            
        </View>

      </View>
      )
  }
}
