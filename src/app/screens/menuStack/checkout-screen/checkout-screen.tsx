import * as React from 'react'
import { View, Text, Picker, AsyncStorage } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer } from 'mobx-react';
import {NavigationScreenProps} from 'react-navigation'
import { toJS } from "mobx"
import { CartStoreModel } from "../../../stores/cart-store"
import { RootStore } from '../../../stores/root-store';

console.disableYellowBox = true;

export interface CheckoutScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class CheckoutScreen extends React.Component<CheckoutScreenProps, any> {

  constructor(props) {
    super(props);
    this.state = {
      location : "Baker Inner Loop", // Location initialized to be Baker Inner Loop
      name : "",
      netID : "",
      phone : "",
      customerID : "",
      rootStore: props.rootStore
    }
  }

  async componentWillMount() {
      // Ensure that user is in store. If not, put them there
      if (!this.props.rootStore.userStore.user.firstName) {
        let netID = await AsyncStorage.getItem("Authenticated");
        await this.props.rootStore.userStore.getUserFromNetID(netID);
      }

      let { netID, firstName, lastName, phone, customerIDArray } = this.props.rootStore.userStore.user;

      // Parse through customerIDArray to find correct vendor
      let { customerID } = customerIDArray.find(pair => pair.accountID == "East West Tea");

      console.log(customerID);

      let name = firstName + " " + lastName;
      this.setState({ netID, name, phone, customerID });
  }

  async createOrder(netID, locationName, vendorName, data) {
    console.log(locationName);
    let success = await this.props.rootStore.cartStore.createOrder(netID, locationName, vendorName, data);
    if (success) {
      console.log("create order was success"); 
      this.props.navigation.navigate("SingleOrderScreen")
    } else {
      console.log("create order failed"); 
      this.props.navigation.navigate("Menu");
    }
  };

  
 
  render() {

  let { rootStore } = this.props
  let {name, email, phone, card} = this.state

  //For Creating Order.
  // Grab cart items from cart store
  let cartItems = rootStore.cartStore.cart;
  // turn cart items to order items in preparation to create order.
  let orderItems = cartItems.map((item, index) => {
    return {
      SKU : item.sku,
      quantity : 1,
      description : item.description,
    }
  })

  //Backend doesn't create customer id-pair for some netid's yet.
  let netID = rootStore.userStore.user.netID === "" ? "jl23" : rootStore.userStore.user.netID
  let location = this.state.location
  let vendorName = "East West Tea" // Maybe this should not be hardcoded????
  
    return (
      <View style={css.screen.defaultScreen}>

        <View style={{
          flex : 2,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}>
          
            <Text style={css.text.headerText}>
                Delivery details
            </Text> 

      <View style={
        {
          flex : 1,
          flexDirection: "column",
          justifyContent : "flex-start",
        }}>

        <View style={{
          flex : .2 ,
          flexDirection : "row",
          justifyContent : "space-between",
          height : 20,
        }}> 


          <Text style={css.text.bigBodyText}>
          Location
          </Text>

        <View style={{height: 50, width: 150}}>
				<Picker
					selectedValue={this.state.location}
                    style={css.picker.locationPicker}
                    itemStyle= {css.picker.locationPickerItem}
					onValueChange={(itemValue, itemIndex) =>
                    this.setState({location: itemValue})
                            }>
          <Picker.Item label="Baker Inner Loop" value="Baker Inner Loop" />
          <Picker.Item label="Wiess" value="Wiess Commons" />
					<Picker.Item label="Martel" value="Martel Commons" />
					<Picker.Item label="Brown" value="Brown Commons" />
					<Picker.Item label="Sid Rich" value="Sid Rich Commons" />
					<Picker.Item label="McMurtry" value="McMurtry Commons" />
					<Picker.Item label="Shepherd" value="Shepherd School" />

				</Picker>
          </View>
            </View>

            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>
              Payment
            </Text>

            <View style={css.container.checkoutScreenContainer}>
            <Text style={css.text.itemText}>
                    Name : {name}{"\n"}
                    Email : {netID + "@rice.edu"}{"\n"}
                    Phone : {phone}
                </Text>
            </View>

              <PrimaryButton
                         title = "Place Order"
                         onPress={() => {
                             this.createOrder(netID, this.state.location, vendorName, orderItems);
                             this.props.navigation.navigate("OrderHistory");
                            }
                        }
                     />
            <View>

            </View>
            
        </View>

      </View>
      </View>
      )
  }
}