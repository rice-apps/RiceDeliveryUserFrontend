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


export const CANCEL_ORDER_WITH_REFUND = gql`
mutation cancelOrder($netID:String!, $vendorName:String!, $orderID:String!) {
  cancelWithRefund(data: {
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

export const CANCEL_ORDER_WITHOUT_REFUND = gql`
mutation cancelWithoutRefund($netID:String!, $vendorName:String!, $orderID:String!) {
  cancelWithoutRefund(data: {
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

export const ORDER_STATUS = gql`
query order($vendorName: String!,$orderID :String!,
  $starting_after :String, $status :String, $netID :String!) { 
  order(vendorName: $vendorName,
      orderID :$orderID,
      status :$status, 
      netID :$netID,
      starting_after :$starting_after){
      paymentStatus
      orderStatus {
        pending
        onTheWay
        arrived
        fulfilled
        unfulfilled
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
      cancelDisable : false,
    }

    this.cancelOrderPush = this.cancelOrderPush.bind(this);

  }

  async cancelOrderPush() {

    let netID = this.state.user.netID;
    let orderID = this.state.order.id;;
      let orderStatus = await client.query({
        query : ORDER_STATUS,
        variables : {
          netID : netID,
          vendorName : "East West Tea",
          orderID : orderID
        }
      })

      console.log(orderStatus);
      console.log(orderStatus.data.order[0]);

      var { status } = getStatusDisplayColor(orderStatus.data.order[0]);
      console.log("latest queried status :" + status);

      /* Don't allow cancellation in these statuses */
      if (status !== "pending" && status !== "on the way") {
        this.setState({
          cancelDisable : true,
        });
        Alert.alert(
          'Sorry you cannot cancel your order at this moment.',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );

        console.log("order is not actually pending or on the way, cannot cancel!")
        return;
      }


      if (status == "pending") { // Status is still pending, can refund order
        Alert.alert(
          'You\'ve requested to cancel this refundable order.',
          'Are you sure?',
          [
            {text: 'Yes', onPress: async () => {
              let netID = this.state.user.netID;
              let vendorName = "East West Tea";
              let cancelledOrder = await client.mutate({
                mutation: CANCEL_ORDER_WITH_REFUND,
                variables: {
                  "netID" : netID,
                  "vendorName" : vendorName,
                  "orderID" : this.state.order.id
                }
              });
              this.props.navigation.goBack();
              if (cancelledOrder.data.cancelWithRefund !== null) {
                console.log("cancel order succeeded")
              } else {
                console.log("cancel order failed") 
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
      } else if (status == "on the way") { // Status is on the way, cannot refund order
        Alert.alert( 
          'You\'ve requested to cancel this non-refundable order.',
          'Are you sure?',
          [
            {text: 'Yes', onPress: async () => {
              let netID = this.state.user.netID;
              let vendorName = "East West Tea";
              let cancelledOrder = await client.mutate({
                mutation: CANCEL_ORDER_WITHOUT_REFUND,
                variables: {
                  "netID" : netID,
                  "vendorName" : vendorName,
                  "orderID" : this.state.order.id
                }
              });
              this.props.navigation.goBack();
              if (cancelledOrder.data.cancelWithoutRefund !== null) {
                console.log("cancel order succeeded")
              } else {
                console.log("cancel order failed") 
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
      } else {
        console.log("Cannot actually cancel this order. not pending or on the way after second check");
      }
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
        disabled = {this.state.cancelDisable}
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
          </View>

      </View>
      </View>
    )
  }
}

