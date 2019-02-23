import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';
import Order from '../components/temporary-mock-order';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';



interface OrderHistItemProps {
    order : Order
}

// Should we always define the input props/state for components instead of <any, any>???
class OrderHistItem extends React.Component<OrderHistItemProps, any> {
    constructor(props) {
        super(props);
    }
    
    checkoutOrderPress() {

    }

    render() {
        let {location, status} = this.props.order;

        var statusDisplay = status.pending ? "pending" : "cancelled";
        statusDisplay = status.onTheWay ? "on the way" : statusDisplay;
        statusDisplay = status.fulfilled ? "fulfilled" : statusDisplay;
        statusDisplay = status.unfulfilled ? "unfulfilled" : statusDisplay;

        var statusColor; 
        switch(statusDisplay) {
            case "pending":
                statusColor = "orange"
                break;
            case "on the way":
                statusColor = "yellow"
                break;

            case "fulfilled":
                statusColor = "green"
                break;
            case "unfilfilled":
                statusColor = "red"
                break;
            default:
                statusColor = "grey"
        }
        // var statusStyle = css.text.orderHistItemText;

        return (
            <View style={css.container.orderHistItem}>
                <View>
                    <Text style={css.text.bodyText}> {location} </Text>
                    <Text style={css.text.smallText}> {status.pending} </Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 20, 
                        borderRadius : 5,
                        overflow : "hidden",
                        padding : 2,
                        margin : 2,
                        textAlign: "center",
                        backgroundColor: statusColor,
                    }}>
                         {statusDisplay} </Text>
                </View>

                <TouchableHighlight onPress={this.checkoutOrderPress}>
                        <Icon name="chevron-right" size={30} color="black" />
                </TouchableHighlight>

            </View>
        )
    }
}

export default withNavigation(OrderHistItem);