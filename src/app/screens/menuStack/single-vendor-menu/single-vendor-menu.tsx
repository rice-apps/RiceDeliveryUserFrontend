import * as React from 'react'
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStoreModel } from '../../../stores/vendorStore';


export class SingleVendorMenu extends React.Component<any, any> {

  constructor(props) {
    super(props) 
  }

  render() {
    var vendor = this.props.navigation.getParam('vendor', 'no_order_retrieved');

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
            <Text style={css.text.headerText}>
                { vendor.name }
            </Text> 
        </View>

      </View>
      )
  }
}
