import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import SingleVendorButton from '../../../components/single-vendor-button';
import * as css from '../../style';
import { EastWestTea, realVendors } from '../../../components/temporary-mock-order';


export class VendorsScreen extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      vendors : [
        EastWestTea,
        {
          _id : "2",
          name : "The Hoot",
          // More fields...
        },
      ],
      // realVendors : realVendors
    }
  }

  render() {
    var vendors = this.state.vendors;
    // var vendors = this.state.realVendors;

    return (
      <View style={css.screen.defaultScreen}>
        <View style={css.flatlist.container}>
          <Text style={css.text.menuHeaderText}>Select Vendor</Text>
          <FlatList
                // style={css.orderList.flatList}
                data= { vendors }
                keyExtractor={(item, index) => item.name}
                renderItem={({item}) => 
                    <SingleVendorButton vendor={item}></SingleVendorButton>
                }
              />
          </View>
      </View>
    )
  }
}
