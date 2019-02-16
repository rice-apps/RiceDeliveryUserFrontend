import * as React from 'react'
import { View, Text, FlatList, ImageEditor } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStoreModel } from '../../../stores/vendorStore';
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor } from '../../../components/temporary-mock-order';


interface SingleVendorMenuState {
  vendor : Vendor
}


export class SingleVendorMenu extends React.Component<any, SingleVendorMenuState> {

  constructor(props) {
    super(props)
    this.state = {
      vendor : this.props.navigation.getParam('vendor', 'no_order_retrieved'),
    }
  }

  // Link to cart screen
  viewCartPush = () => {
    this.props.navigation.navigate("Cart")
  }

  render() {
    var vendor = this.state.vendor;
    var { name, products } = vendor;

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.flatlist.container}>

          <Text style={css.text.headerText}>
                { name }
            </Text>

            <Text style={css.text.headerText}>
                Select Items
            </Text>

            {/* <FlatList
                // style={css.flatlist}
                data= { products }
                keyExtractor={(product, index) => product.name}
                renderItem={({product}) => 
                    <Text> {</Text>
                }
              /> */}
        </View>

        <PrimaryButton
            title ="View Cart"
            onPress = {this.viewCartPush}
          />
      </View>
      )
  }
}
