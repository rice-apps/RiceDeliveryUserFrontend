import * as React from "react"
import { Text, ScrollView, View, StyleSheet, FlatList} from "react-native"
import SingleVendorButton from "../../../components/single-vendor-button"
import * as css from "../../style"
import { client } from "../../../main"
import gql from "graphql-tag"
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import LoadingScreen from "../../LoadingScreen";
import { PushNotificationIOS, Alert } from 'react-native'

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

interface VendorsScreenProps {
  rootStore : RootStore
}


@inject("rootStore")
@observer
export class VendorsScreen extends React.Component<VendorsScreenProps, any> {

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
    this.setState({vendors: vendors, loading: false})
  }

  requestPermission = async() => {
    console.log("requesting permission1 ")
    var res = await PushNotificationIOS.requestPermissions()
    console.log("requesting permission")
    if(res.alert || res.badge || res.sound){
      this.props.rootStore.userStore.setNotificationGranted(true)
      // this.props.rootStore.userStore.AddTokenToUser()
    } else {
      this.props.rootStore.userStore.setNotificationGranted(false)
    }
  }

  componentDidMount() {
    let { rootStore } = this.props;
    console.log('component did mount')
    this.getVendors();
    this.requestPermission()
    console.log("finished")
  }

  render() {
    if (this.state.loading) {
      return (<LoadingScreen />)
    }
    console.log("rendered")
    this.props.rootStore.vendorStore.initialize();
    var vendors = this.state.vendors
    console.log("rendering")

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
