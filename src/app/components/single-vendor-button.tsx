import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as css from '../screens/style';


// Should we always define the input props/state for components instead of <any, any>???
class SingleVendorButton extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onVendorPress = this.onVendorPress.bind(this);
    }

    onVendorPress() {
        this.props.navigation.navigate('SingleVendorMenu', {
            vendor : this.props.vendor
        }); 
    }

    render() {
        // Currently, just displaying vendor name from struct
        var vendorName = this.props.vendor.name;

        return (
            <TouchableHighlight onPress={this.onVendorPress}>
                <View style={css.flatlist.vendorView}>
                        <Text style={css.text.bigBodyText}> {vendorName} </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(SingleVendorButton);

