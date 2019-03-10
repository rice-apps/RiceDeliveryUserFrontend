import * as React from 'react'
import { View, Text, Picker } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../stores/root-store'
console.disableYellowBox = true; 

interface CheckoutScreenProps {
  rootStore: RootStore,
}
@inject("rootStore")
@observer
export class CheckoutScreen extends React.Component<CheckoutScreenProps, any> {

  constructor(props) {
    super(props) 
    this.state = {
      name: "Johnny Cai",
      defaultLocation : "Nowhere",
      email : "coolguy@gmail.com",
      phone : "(123)456-789",
      card : "123456789",
      language: "Martel Commons" //field must be called language due to Picker's requirements.
    }
  }

  payOrder(UpdateOrderInput, creditToken){
    this.props.rootStore.cartStore.payOrder(UpdateOrderInput, creditToken);
  }

  async createOrder(netID, defaultLocation, vendorName, data) {
    // Retrieve the order (to get the order_id for pay order).
    let order = await this.props.rootStore.cartStore.createOrder(netID, defaultLocation, vendorName, data);

    // Used for paying the order.
    let UpdateOrderInput = {netID: netID, vendorName: vendorName, orderID: order.data.createOrder.id}
    let creditToken = "tok_visa"; // Should be able to retrieve credit from individual user.
    
    this.payOrder(UpdateOrderInput, creditToken);

  };

  
 
  render() {

  let { rootStore } = this.props;
  let {name, email, phone, card} = this.state;

  //For Creating Order.
  let arr = Array.from(rootStore.cartStore.cartMap.toJS().entries()).filter(pair => pair[1].quantity > 0);
  let netID = rootStore.userStore.user.netID === "" ? "jl23" : rootStore.userStore.user.netID; //Backend doesn't create customer id-pair for some netid's yet.
  let location = this.state.language;
  let vendorName = "East West Tea";
  let data = arr.map(x => ({"SKU": x[1].sku, "quantity": x[1].quantity}));
  
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
					selectedValue={this.state.language}
          style={css.picker.locationPicker}
					onValueChange={(itemValue, itemIndex) =>
					this.setState({language: itemValue})
					}>

					<Picker.Item label="Wiess" value="Wiess Commons" />
					<Picker.Item label="Martel" value="Martel Commons" />
					<Picker.Item label="Brown" value="Brown Commons" />
					<Picker.Item label="Sid Rich" value="Sid Rich Commons" />
					<Picker.Item label="McMurtry" value="McMurtry Commons" />
					<Picker.Item label="Shepherd" value="Shepherd School" />

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
                        onPress = {() => this.createOrder(netID, location, vendorName, data)
                        }
                    />
            </View>
            
        </View>

      </View>
      )
  }
}