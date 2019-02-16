import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';
import { Product } from '../components/temporary-mock-order';


interface MenuScreenItemProps {
    product : Product
}

// Should we always define the input props/state for components instead of <any, any>???
export class MenuScreenItem extends React.Component<MenuScreenItemProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        var {name, images, description, skuItems} = this.props.product;
        

        return (
            <View style={css.container.menuItem}>
            {/* <View style={css.flatlist.vendorView}> */}
                    <Text style={css.text.bodyText}> {name} </Text>
            </View>
        )
    }
}
