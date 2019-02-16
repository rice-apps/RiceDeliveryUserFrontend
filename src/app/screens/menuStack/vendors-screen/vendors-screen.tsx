import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import SingleVendorButton from '../../../components/single-vendor-button';
import * as css from '../../style';
import { EastWestTea } from '../../../components/temporary-mock-order';


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
      ]
    }
  }

  render() {
    return (
      <View style={css.screen.defaultScreen}>
          <Text style={css.text.headerText}>Select Vendor</Text>
          <FlatList
                // style={css.orderList.flatList}
                data= {this.state.vendors}
                keyExtractor={(item, index) => item._id}
                renderItem={({item}) => 
                    <SingleVendorButton vendor={item}></SingleVendorButton>
                }
              />
      </View>
    )
  }
}
