import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import SingleVendorButton from '../../../components/single-vendor-button';
import * as css from '../../style';

export class VendorsScreen extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      vendors : [
        {
          id : 1,
          name : "East West Tea",
          // More fields...
        },
        {
          id : 2,
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
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({item}) => 
                    <SingleVendorButton vendor={item}></SingleVendorButton>
                }
              />
      </View>
    )
  }
}
