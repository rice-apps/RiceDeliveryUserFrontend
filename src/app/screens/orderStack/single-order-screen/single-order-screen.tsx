import * as React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'

import { mock_orders } from '../../../components/temporary-mock-order';
// Using mock order data again

import { inject, observer } from 'mobx-react';

@inject("rootStore")
@observer
export class SingleOrderScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // We must link this with the most recent/active order for this user
    this.state = {
      order : props.navigation.getParam('order', 'no_order_received'),
      user: props.rootStore.userStore.user
    }
  }

  // Link to order history screen
  previousOrdersPush = () => {
    this.props.navigation.navigate("OrderHistory")
  }

  render() {
    var order = this.state.order;
    if (order == 'no_order_retrieved') {
      console.log("Didn't find passed in order prop!");
    }
    console.log(this.state.order);

    // var { firstName, lastName } = order.user;
    var {firstName, lastName } = this.state.user;
    var { location, id } = this.state.order;
    console.log("PRINT LOCATION: " +JSON.stringify(location) + " PRINT ID: " + id)
    var location = location.name;
    var { pending, onTheWay, fulfilled } = this.state.order.orderStatus;

    return (
      <View style={css.screen.defaultScreen}>
    
      <View style={css.screen.singleOrderDisplay}>
        <Text style={css.text.headerText}>Active Order</Text>
        <Text style={css.text.smallText}>
          {'Placed at : ' + pending}
        </Text>
        <Text style={css.text.headerText}>
          Order ID: #{id}
        </Text>

        <Divider style={css.screen.divider} />

        <Text style={css.text.bodyText}>
          {firstName + ' ' + lastName + '\'s order'}
        </Text>
        <Text style={css.text.bodyText}>
          {'Location : ' + location}
        </Text>
        <Text style={css.text.bodyText}>
          {'Status : ' + 'pending'}
        </Text>

        <Divider style={css.screen.divider} />

        <Text style={css.text.bigBodyText}>
          Order Details
        </Text>

        <View>
          <FlatList
                // style={}
                data= {order.items.filter((item, idx, arr) => {
                    return (item.quantity != null);
                })}
                keyExtractor={(item, index) => {
                    console.log("item:");
                    console.log(item);
                    return 1;
                }}
                renderItem={({item}) => 
                    <Text style={css.text.itemText}> 
                      {item.quantity.toString() + 'x ' + item.description}
                    </Text>
                }
              />
        </View>
      </View>

        <PrimaryButton
            title ="Order History"
            onPress = {this.previousOrdersPush}
          />

      </View>
    )
  }
}

