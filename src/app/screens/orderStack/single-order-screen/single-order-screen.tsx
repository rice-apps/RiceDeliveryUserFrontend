import * as React from "react"
import { View, StyleSheet, FlatList, Text, Modal, Alert } from "react-native"
import * as css from "../../style"
import { Divider } from "react-native-elements"
import PrimaryButton from "../../../components/primary-button.js"
import SecondaryButton from "../../../components/secondary-button.js"
import { inject, observer } from "mobx-react"
import { getStatusDisplayColor, getOrderTime } from "../../util"
import gql from "graphql-tag"
import { client } from "../../../main"


export const CANCEL_ORDER = gql`
mutation cancelOrder($netID:String!, $vendorName:String!, $orderID:String!) {
  cancelOrder(data: {
    netID: $netID, 
    vendorName: $vendorName,
    orderID: $orderID
  }) {
    id
    amount
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
      name
    }
  }
}
`

export const REFUND_ORDER = gql`
mutation refundOrder($netID:String!, $vendorName:String!, $orderID:String!) {
  refundOrder(data: {
    netID: $netID, 
    vendorName: $vendorName,
    orderID: $orderID
  }) {
    id
    amount
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
      name
    }
  }
}
`



@inject("rootStore")
@observer
export class SingleOrderScreen extends React.Component<any, any> {
  constructor(props) {
    super(props)
    // We must link this with the most recent/active order for this user
    this.state = {
      order : props.navigation.getParam("order", "no_order_received"),
      user: props.rootStore.userStore.user,
      cancelModalVisible : false,
      refundModalVisible : false,
    }

    this.cancelOrderPush = this.cancelOrderPush.bind(this);
    this.refundOrderPush = this.refundOrderPush.bind(this);

  }

  	cancelOrderPush() {
      Alert.alert(
        'You\'ve requested to cancel this non-refundable order.',
        'Would you wish to continue to cancel this order?',
        [
          {text: 'Yes', onPress: () => {

            let netID = this.state.user.netID;
            let vendorName = "East West Tea";
            let cancelledOrder = client.mutate({
              mutation: CANCEL_ORDER,
              variables: {
                "netID" : netID,
                "vendorName" : vendorName,
                "orderID" : this.state.order.id
              }
            });
            this.props.navigation.goBack();
            if (cancelledOrder !== null) { // IS THIS A CORRECT ERROR CHECK????
              console.log("cancel order failed") 
            } else {
              console.log("cancel order succeeded")
            }
    
          }},
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      // this.setState({
      //   cancelModalVisible : !this.state.cancelModalVisible
      // })
	//   Call some query
}

	refundOrderPush() {
    Alert.alert(
      'You\'ve requested refund this order.',
      'Would you wish to continue to refund this order?',
      [
        {text: 'Yes', onPress: () => {

          let netID = this.state.user.netID;
          let vendorName = "East West Tea";
          let cancelledOrder = client.mutate({
            mutation: REFUND_ORDER,
            variables: {
              "netID" : netID,
              "vendorName" : vendorName,
              "orderID" : this.state.order.id
            }
          });
          this.props.navigation.goBack();
          if (cancelledOrder !== null) { // IS THIS A CORRECT ERROR CHECK????
            console.log("refund order failed") 
          } else {
            console.log("refund order succeeded")
          }
  
        }},
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

	//   Call some query	  
	}

  render() {
    console.log("Rendering the single order screen for the following order:");
    console.log(this.state.order);
    var order = this.state.order;
    if (order == "no_order_retrieved") {
	  console.log("Didn't find passed in order prop!")
	  return (
      <View style={css.screen.defaultScreen}>
		<View style={css.screen.singleOrderDisplay}>
				<Text>Oops! Order did not load correctly.</Text>
		</View>
	  </View>)
    }

	var {firstName, lastName } = this.state.user
    var { location, id } = this.state.order
    var location = location.name
  var { pending, onTheWay, fulfilled } = this.state.order.orderStatus
  let { paymentStatus } = this.state.order;
	var { status, color } = getStatusDisplayColor(this.state.order)
	var time = getOrderTime(this.state.order)

    let cancelOrderButton = 
    <View>
        <PrimaryButton
        title ="Cancel Order"
        onPress = {this.cancelOrderPush}
        />
    </View>

    let refundOrderButton = 
    <View>
        <SecondaryButton
            style= {{
              borderWidth : 5,
              borderColor : "red"
            }}
            title ="Refund Order"
            onPress = {this.refundOrderPush}
            />
    </View>

	var count = 0
    return (
		<View style={css.screen.defaultScreen}>
    
      <View style={css.screen.singleOrderDisplay}>
      <View style={{justifyContent : "flex-start"}}>

        <Text style={css.text.headerText}>Order</Text>
        <Text style={css.text.smallText}>
          {"Time: " + time.toDateString()}
        </Text>
        <Text style={css.text.smallText}>
          Order ID #{id}
        </Text>

        <Divider style={css.screen.divider} />

        <Text style={css.text.bodyText}>
          {firstName + " " + lastName + "'s order"}
        </Text>
        <Text style={css.text.bodyText}>
          {"Location : " + location}
        </Text>
        <Text style={[css.text.bodyText, {color : color}]}>
          {"Status : " + status}
        </Text>

        <Divider style={css.screen.divider} />

        <Text style={css.text.bigBodyText}>
          Order Details
        </Text>

        <View>
          <FlatList
                // style={}
                data= {order.items.filter((item, idx, arr) => {
                    return (item.quantity != null)
                })}
                keyExtractor={(item, index) => {
                    count++
                    return count.toString()
                }}
                renderItem={({item}) => 
                    <Text style={css.text.itemText}> 
                      {item.quantity.toString() + "x " + item.description}
                    </Text>
                }
              />
        </View>
      </View>
          <View>
          {!fulfilled && paymentStatus !== "canceled" ? cancelOrderButton : null}
          {!onTheWay && paymentStatus !== "returned" ? refundOrderButton : null}
          </View>


          {/* <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.cancelModalVisible}>
            <View style={{
              backgroundColor : "blue"
            }}>
              <Text>
                You've asked to cancel this order.
              </Text>
            </View>
            
            </Modal>
            
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.refundModalVisible}>
            <View style={{
              backgroundColor : "blue"
            }}>
              <Text>
                You've asked to cancel this order.
              </Text>
            </View>
            
            </Modal> */}

      </View>
      </View>
    )
  }
}

