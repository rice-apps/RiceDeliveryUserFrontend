import * as React from 'react'
import { View, Text, Picker, AsyncStorage, Alert, StyleSheet, FlatList } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import { inject, observer, Observer } from 'mobx-react';
import { NavigationScreenProps } from 'react-navigation'
import { toJS } from "mobx"
import { CartStoreModel } from "../../../stores/cart-store"
import { RootStore } from '../../../stores/root-store';
import { PushNotificationIOS, Alert } from 'react-native'
import {material} from "react-native-typography"
import { StackActions, NavigationActions } from 'react-navigation';

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
      rootStore: props.rootStore,
      orderDisabled: false,
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
      /* Clearing the cart store */
      this.props.rootStore.cartStore.removeAllItems();
      // /* Paying for the order */
      // let payment = await client.mutate({
      //   mutation: PAY_ORDER,
      //   variables: {
      //     "netID": netID,
      //     "vendorName": vendorName,
      //     "orderID": orderID
      //   }
      // });
      // console.log(payment);
      console.log("create order was success");
      this.props.rootStore.cartStore.removeAllItems()
      await this.props.rootStore.orderStore.getOrders(netID, null);
      await this.props.navigation.popToTop()
      this.props.navigation.navigate("OrderHistory")

    } else {
      console.log("create order failed");
    }

    this.setState({
      orderDisabled : true
    })
  };

  async updateWeekHours(){
    let hours = [[],[],[],[],[],[],[]]
    // transforms the hours array. 

    this.props.rootStore.vendorStore.vendors[0].hours.map(([open, close], index) => {
        if (open > close) {
            hours[index].push([open,24])
            if (index === 6){
                hours[0].push([0, close])
            } else {
                hours[index+1].push([0, close])
            }
        } else {
            hours[index].push([open, close])
        }
    })
    this.props.rootStore.vendorStore.setHourTransformed(hours)
}

  async checkStatuses() {
    // get the hours 
    await this.props.rootStore.vendorStore.getHours()
    console.log("finished grabbing hours from backend")
    // transform the hours array 
    await this.updateWeekHours()
    console.log("finish transforming the hours arr")

    // check if our current time is within opening hours
    await this.props.rootStore.vendorStore.check_open(new Date())
    console.log('finishing checking open status: ' + this.props.rootStore.vendorStore.check_open)

    // // 
    if (this.props.rootStore.vendorStore.open){

      let results = await this.props.rootStore.cartStore.checkAllCartItems()
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

        }
    } else {
      Alert.alert("Unfortunately, East West Tea has closed and we cannot place your order. Please come back when we are open!")
      this.props.rootStore.cartStore.removeAllItems()
      this.props.navigation.navigate("Vendors")
    }

    

  }

  renderItems = ({item, index}) => {
    var cartItemAttributes = [item.attributes.map((attr) => attr.value)].join(' ')
    console.log(cartItemAttributes)
    return (
      <Observer>
        {() => (
          <View>
            <Text style={material.subheading}>
              {` ${index + 1}. ${item.productName.toString()}`}
            </Text>
            <Text style={[material.body2]}>
              {"      " + cartItemAttributes.toString()}
            </Text>
            {item.description.length > 0 && 
            <Text style={material.caption}>
              {"      " + item.description}
            </Text>
          }
          </View>

        )}
      </Observer>
    )
    

  }


  render() {
    let { rootStore } = this.props
    let user = rootStore.userStore.user
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
    let netID = rootStore.userStore.user.netID
    let location = this.state.location
    let vendorName = "East West Tea" // Maybe this should not be hardcoded????
    let deliveryCost = 1.50;
    let subtotalCost = cartItems.reduce((previous, item) => previous + (item.price / 100.0), 0)
    let locationOptions = this.props.rootStore.vendorStore.vendors[0].locationOptions

    let locationPickerItems = locationOptions.map((s, i) => {
      return <Picker.Item key={i} value={s.name} label={s.name} />
    });

  console.log("locationOptions");
  console.log(locationOptions);

    return (
      <View style={css.screen.defaultScreen}>          
          <View style={localStyles.flexColumn}>
            <View style={localStyles.flexColumnCenter}>
            <Text style={[material.display2, {paddingBottom: 5}]}> Delivery details</Text>
              <Text style={[material.display1, {color: "black"}]}>Select Location:</Text>
              <View style={localStyles.flexRow}>
                <Picker
                    selectedValue={this.state.location}
                    style={{height: 50}}
                    itemStyle={css.picker.locationPickerItem}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ location: itemValue })
                    }>
                    {locationPickerItems}

                  </Picker>
                </View>
            </View>
            <Divider style={css.screen.divider} />
            <Text style={[material.headline,{paddingTop: 5, paddingBottom: 5, paddingLeft:10}]}>Payment</Text>
            <View style={css.container.checkoutScreenContainer}>
              <Text style={material.subheading}>
                Name : {`${user.firstName} ${user.lastName}`}{"\n"}
                Email : {user.netID + "@rice.edu"}{"\n"}
                Phone : {user.phone}{"\n"}
                Card Ending In: {user.last4}
              </Text>
            </View>
            <Divider style={css.screen.divider} />
            <Text style={[material.headline, {paddingTop: 5, paddingBottom: 5, paddingLeft: 10, color: "black"}]}>Order details:</Text>
            
            <View style={{height: "26%", paddingLeft: 15, paddingRight: 15, paddingTop: 5}}>
              <FlatList
                    // style={}
                    data= {cartItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItems}
                  />
            </View>

            <PrimaryButton
              title="Place Order"
              onPress={() => {
                this.setState({
                  orderDisabled : true
                })
                this.checkStatuses();
              }}
              disabled = {this.state.orderDisabled}
            />
            <View>
          </View>
        </View>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  flexColumn: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems:"center",
    width:"100%"
  },
  flexRow: {
    flex: .2,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 20,
  },
  flexColumnCenter: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center",
    width:"100%",
  },
})