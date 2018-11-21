import * as React from "react"
import { Order } from "../../../app/stores/order-store"
import { View, Text, TextStyle, SectionList } from "react-native"
import { VendorStore } from "../../../app/stores/vendorStore";

const BOLD: TextStyle = { fontWeight: "bold" }
const ORDER: TextStyle = {
    ...BOLD,
    fontSize: 25,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 1.5,
    color: "white",
}
const ITEM: TextStyle = {
    ...ORDER,
    fontWeight: "normal",
    fontSize: 20,
    textAlign: "center",
}

// Passing in the entire vendor store here just to figure out vendor names, maybe filter before here?
export interface SingleOrderProps {
    order?: Order;
    vendorStore?: VendorStore;
}

export class SingleOrder extends React.Component<SingleOrderProps, {}> {

    render() {
        // Get list of all vendors
        let { vendor : vendors } = this.props.vendorStore;   
        // Extract this order's vendor, items, name, and location     
        let { vendor, items} = this.props.order;
        let { name : location } = this.props.order.location;
        // Filter to get the vendor for this order
        let currentVendor = vendors.filter(x => x._id == vendor)[0];

        return (
            <View>
                <SectionList
                renderItem={({item, index}) => {
                    let { quantity } = item;
                    let { name, prices } = item.item;
                    // We don't actually have any price pairs currently...
                    // console.log("Price pairs:", prices)
                    // let { price } = prices[0];
                    return <Text style={ITEM}> { quantity } { name } </Text>}}
                renderSectionHeader={({section: {title}}) => <Text style={ORDER}>{title}</Text>}
                sections={[
                  {title: currentVendor.name + ' - ' + location , data: items.map((x, index) => x)},
                ]}
                keyExtractor={(item, index) => item + index}
              />
            </View>
        )
    }
}
