import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import * as css from '../../style';


export class VendorsScreen extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      vendors : [
        
      ]
    }
  }

  render() {

    return (
      <View style={css.screen.defaultScreen}>
          <Text style={css.text.headerText}>Select Vendor</Text>
      </View>
    )
  }
}
