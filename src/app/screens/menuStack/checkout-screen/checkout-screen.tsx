import * as React from 'react'
import { View, Text, Picker, AsyncStorage, Alert } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer } from 'mobx-react';
import { NavigationScreenProps } from 'react-navigation'
import { toJS } from "mobx"
import { CartStoreModel } from "../../../stores/cart-store"
import { RootStore } from '../../../stores/root-store';
import { PushNotificationIOS, Alert } from 'react-native'




import { client } from "../../../main"
import gql from "graphql-tag"
console.disableYellowBox = true;


export const PAY_ORDER = gql`
mutation payOrder($netID:String!, $vendorName:String!, $orderID:String!) {
  payOrder( data: {
    netID: $netID, 
    vendorName: $vendorName,
    orderID: $orderID
  }
    creditToken: "tok_amex"
  ) {
    id
    amount
    created
    customer
    netID
    customerName
    email
    orderStatus {
      pending
      onTheWay
      fulfilled
      unfulfilled
      refunded
    }
    paymentStatus
    location {
      _id
      name
    }
  }
}
`


export const CHECK_SKU = gql`
query checkSKU($vendorName: String!, $sku:String!){
  sku(vendorName: $vendorName, sku: $sku){
    inventory{
      value
    }
  }
}
`

export interface CheckoutScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class CheckoutScreen extends React.Component<CheckoutScreenProps, any> {

  constructor(props) {
    super(props);
    this.state = {
      location: "Baker Inner Loop", // Location initialized to be Baker Inner Loop
      name: "",
      netID: "",
      phone: "",
      customerID: "",
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


    let name = firstName + " " + lastName;
    this.setState({ netID, name, phone, customerID });
  }

  async createOrder(netID, locationName, vendorName, data) {
    /* Creating the order */
    let orderID = await this.props.rootStore.cartStore.createOrder(netID, locationName, vendorName, data);
    if (orderID !== null) {

      console.log("create order was success");
      this.props.navigation.popToTop();
      this.props.navigation.navigate("OrderHistory");

      /* Clearing the cart store */
      this.props.rootStore.cartStore.removeAllItems();

      /* Paying for the order */
      let payment = client.mutate({
        mutation: PAY_ORDER,
        variables: {
          "netID": netID,
          "vendorName": vendorName,
          "orderID": orderID
        }
      });
      console.log(payment);
    } else {
      console.log("create order failed");
    }


  };

  async checkStatuses() {
    let items = await this.props.rootStore.cartStore.checkAllCartItems().then((results) => {
      if (results.length > 0) {
        let message = []

        results.map(item => {
          message.push(item.productName)
          this.props.rootStore.cartStore.removeFromCart(item)
        })
        var messageUnique = message.filter((item, index) => {
          return message.indexOf(item) >= index
        })
        Alert.alert("We are currently out of the following flavors: \n"
          + messageUnique.join(", ") + "\n. Please try another one of our flavors! ")

        this.props.navigation.navigate("Cart")

      } else {
        let vendorName = "East West Tea" // Maybe this should not be hardcoded????
        //For Creating Order.
        // Grab cart items from cart store
        let cartItems = this.props.rootStore.cartStore.cart;
        // turn cart items to order items in preparation to create order.
        let orderItems = cartItems.map((item, index) => {
          return {
            SKU: item.sku,
            quantity: 1,
            description: item.description,
          }
        })
        this.createOrder(this.props.rootStore.userStore.user.netID, this.state.location, vendorName, orderItems);
        this.props.navigation.navigate("OrderHistory")
      }
    })

  }


  render() {

    let { rootStore } = this.props
    let { name, phone } = this.state

    //For Creating Order.
    // Grab cart items from cart store
    let cartItems = rootStore.cartStore.cart;
    // turn cart items to order items in preparation to create order.
    let orderItems = cartItems.map((item, index) => {
      return {
        SKU: item.sku,
        quantity: 1,
        description: item.description,
      }
    })

    //Backend doesn't create customer id-pair for some netid's yet.
    let netID = rootStore.userStore.user.netID === "" ? "jl23" : rootStore.userStore.user.netID
    let location = this.state.location
    let vendorName = "East West Tea" // Maybe this should not be hardcoded????

    let locationOptions = this.props.rootStore.vendorStore.vendors[0].locationOptions



  console.log("locationOptions");
  console.log(locationOptions);

  let locationPickerItems = locationOptions.map((s, i) => {
    return <Picker.Item key={i} value={s.name} label={s.name} />
  });


    return (
      <View style={css.screen.defaultScreen}>

        <View style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}>

          <Text style={css.text.headerText}>
            Delivery details
            </Text>

          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}>

            <View style={{
              flex: .2,
              flexDirection: "row",
              justifyContent: "space-between",
              height: 20,
            }}>


              <Text style={css.text.bigBodyText}>
                Location
          </Text>

              <View style={css.picker.pickerContainer}>
                <Picker
                  selectedValue={this.state.location}
                  style={css.picker.locationPicker}
                  itemStyle={css.picker.locationPickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ location: itemValue })
                  }>
                  {locationPickerItems}

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
              title="Place Order"
              onPress={() => this.checkStatuses()}
            />
            <View>

            </View>

          </View>

        </View>
      </View>
    )
  }
}