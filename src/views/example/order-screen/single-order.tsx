import * as React from "react"
import { Order } from "../../../app/stores/order-store"
import { View, Text, TextStyle, SectionList } from "react-native"

const BOLD: TextStyle = { fontWeight: "bold" }
const ORDER: TextStyle = {
    ...BOLD,
    fontSize: 25,
    lineHeight: 30,
    textAlign: "left",
    letterSpacing: 1.5,
    color: "white",
}
const ITEM: TextStyle = {
    ...ORDER,
    textAlign: "center",
}


export interface SingleOrderProps {
    order?: Order;
}

export class SingleOrder extends React.Component<SingleOrderProps, {}> {

    render() {
        console.log(this.props.order);
        let { vendor, items} = this.props.order;
        let { name : location } = this.props.order.location;

        return (
            <View>
                <SectionList
                // renderItem={({item, index}) => {return <Text> { item.item } { item.quantity }</Text>}}
                renderItem={({item, index}) => {
                    let { quantity } = item;
                    let { name, prices } = item.item;
                    return <Text style={ITEM}> { quantity } { name } </Text>}}
                renderSectionHeader={({section: {title}}) => <Text style={ORDER}>{title}</Text>}
                sections={[
                  {title: 'Order on ____ from ' + vendor , data: items.map((x, index) => x)},
                ]}
                keyExtractor={(item, index) => item + index}
              />
            </View>
        )
    }
}
