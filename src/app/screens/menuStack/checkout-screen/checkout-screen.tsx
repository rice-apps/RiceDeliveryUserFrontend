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
      location : "Jones",
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

  async createOrder(netID, defaultLocation, vendorName, data) {
    let success = await this.props.rootStore.cartStore.createOrder(netID, defaultLocation, vendorName, data);
    if (success) {
      // console.log("success");
      this.props.navigation.navigate("SingleOrderScreen")
    } else {
      this.props.navigation.navigate("Menu");
    }
  };

  render() {

  let { rootStore } = this.props;
  let arr = Array.from(rootStore.cartStore.cartMap.toJS().entries()).filter(pair => pair[1].quantity > 0);
  let mockNetID = "jl23";
  let defaultLocation = "Weiss";
  let vendorName = "East West Tea";
  let data = arr.map(x => ({"SKU": x[1].sku, "quantity": x[1].quantity}));

  let {name, netID, phone, creditToken} = this.state;
  

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
                    Email : {netID + "@rice.edu"}{"\n"}
                    Phone : {phone}
                </Text>
            </View>

            {/* <View style={css.container.checkoutScreenContainer}>
                <Text>
                    Card Number : {creditToken}
                </Text>
            </View> */}

            <View>   

             <PrimaryButton
                        title = "Place Order"
                        onPress={() => this.createOrder(netID, this.state.location, vendorName, data)}
                    />
            </View>
            
        </View>

      </View>
      )
  }
}
