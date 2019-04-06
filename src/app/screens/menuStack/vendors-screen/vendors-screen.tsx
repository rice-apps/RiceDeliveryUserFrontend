import * as React from "react"
import { Text, ScrollView, View, StyleSheet, FlatList} from "react-native"
import SingleVendorButton from "../../../components/single-vendor-button"
import * as css from "../../style"
import { client } from "../../../main"
import gql from "graphql-tag"
import LoadingScreen from "../../LoadingScreen";

const GET_VENDOR_QUERY = gql`
  query {
    vendor(name:"East West Tea") {
      _id
      name
      phone
      hours
    }
  }
`
export class VendorsScreen extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      vendors : [],
      loading: true
    }
  }

  getVendors = async() => {
    const vendors = (await client.query({
      query: GET_VENDOR_QUERY
    })).data.vendor;
    console.log(vendors);
    this.setState({vendors: vendors, loading: false})
    console.log(this.state)
  }
  componentDidMount() {
    this.getVendors();
  }

  render() {
    if (this.state.loading) {
      return (<LoadingScreen />)
    }
    var vendors = this.state.vendors
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
