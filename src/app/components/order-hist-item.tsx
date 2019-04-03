import * as React from "react"
import { Text, View, StyleSheet, TouchableHighlight } from "react-native"
import * as css from "../screens/style"
import Order from "../components/temporary-mock-order"
import { withNavigation } from "react-navigation"
import Icon from "react-native-vector-icons/MaterialIcons"
import { getStatusDisplayColor, getOrderTime } from "../screens/util"



class OrderHistItem extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.checkoutOrderPress = this.checkoutOrderPress.bind(this)
    }
    
    checkoutOrderPress() {
        this.props.navigation.navigate("SingleOrder", { order : this.props.order })
    }

    render() {
        let { location } = this.props.order;
        var statusDisplay = getStatusDisplayColor(this.props.order);
        var time = getOrderTime(this.props.order);

        return (
            <View style={css.container.orderHistItem}>
                <View>
                    <Text style={css.text.bodyText}> { location.name} </Text>
                    <Text> {time.toLocaleDateString() + " - " + time.toLocaleTimeString()}</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 20, 
                        borderRadius : 5,
                        overflow : "hidden",
                        padding : 2,
                        margin : 2,
                        textAlign: "center",
                        backgroundColor: statusDisplay.color,
                    }}>
                         {statusDisplay.status} </Text>
                </View>

                <TouchableHighlight 
                    style={{
                        padding: 10,
                    }} 
                    onPress={this.checkoutOrderPress}>
                        <Icon name="chevron-right" size={30} color="black" />
                </TouchableHighlight>

            </View>
        )
    }
}

export default withNavigation(OrderHistItem)