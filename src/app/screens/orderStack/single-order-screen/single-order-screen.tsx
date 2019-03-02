import * as React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button.js'
import SecondaryButton from '../../../components/secondary-button.js'
import { inject, observer } from 'mobx-react';
import { getStatusDisplayColor, getOrderTime } from '../../util';

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

  	cancelOrderPush() {
	//   Call some query
}

	refundOrderPush() {
	//   Call some query	  
	}

  render() {
    var order = this.state.order;
    if (order == 'no_order_retrieved') {
	  console.log("Didn't find passed in order prop!");
	  return (
      <View style={css.screen.defaultScreen}>
		<View style={css.screen.singleOrderDisplay}>
				<Text>Oops! Order did not load correctly.</Text>
		</View>
	  </View>);
    }

	var {firstName, lastName } = this.state.user;
    var { location, id } = this.state.order;
    var location = location.name;
	var { pending, onTheWay, fulfilled } = this.state.order.orderStatus;
	var { status } = getStatusDisplayColor(this.state.order);

    let orderOptions = 
    <View>
        <PrimaryButton
            title ="Cancel Order"
            onPress = {this.cancelOrderPush}
          />
        <SecondaryButton
            title ="Refund Order"
            onPress = {this.refundOrderPush}
          />
    </View>

	var count = 0;
    return (
		<View style={css.screen.defaultScreen}>
    
      <View style={css.screen.singleOrderDisplay}>
        <Text style={css.text.headerText}>Active Order</Text>
        <Text style={css.text.smallText}>
          {'Placed at : ' + status}
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
          {'Status : ' + status}
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
					count++;
                    return count.toString();
                }}
                renderItem={({item}) => 
                    <Text style={css.text.itemText}> 
                      {item.quantity.toString() + 'x ' + item.description}
                    </Text>
                }
              />
        </View>
        {!fulfilled ? orderOptions : null}
      </View>
      </View>
    )
  }
}

