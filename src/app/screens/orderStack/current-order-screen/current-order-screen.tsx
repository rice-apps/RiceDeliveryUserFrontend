import * as React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'

import { mock_orders } from '../../../components/temporary-mock-order';
// Using mock order data again

export class OrderScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // We must link this with the most recent/active order for this user
    this.state = {
      order : mock_orders.order1
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

    var { firstName, lastName } = order.user;
    var { location, id } = order;
    var { pending, onTheWay, fulfilled } = order.status;

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
                data= {order.items}
                keyExtractor={(item, index) => item.item.id.toString()}
                renderItem={({item}) => 
                    <Text style={css.text.itemText}> 
                      {item.quantity.toString() + 'x ' + item.item.itemName}
                    </Text>
                }
              />
        </View>
      </View>

        <PrimaryButton
            title ="Previous Orders"
            onPress = {this.previousOrdersPush}
          />

      </View>
    )
  }
}

