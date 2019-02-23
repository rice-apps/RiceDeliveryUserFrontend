import * as React from 'react'
import { View, Text, FlatList, ImageEditor, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStore } from '../../../stores/vendor-store';
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor, EastWestTea, EastWestTeaWithoutProducts } from '../../../components/temporary-mock-order';
import { MenuScreenItem } from '../../../components/menu-item';
import { client } from '../../../main';
import gql from 'graphql-tag';
import LoadingScreen from '../../LoadingScreen';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { getSnapshot } from 'mobx-state-tree';


interface SingleVendorMenuState {
  vendor : Vendor,
  isLoading: boolean
}

interface SingleVendorMenuProps {
  rootStore: RootStore,
  navigation: NavigationScreenProp<any, any>
}
const GET_MENU = gql`
  query getMenu($vendorName: String!){
    vendor(name: $vendorName) {
      name
      products {
        id
        name
        caption
        active
        images
        attributes
        description
        skuItems {
          image
          active
          id
          price
          product
          attributes 
          {
            key
            value
          }
          inventory {
            type
            value
            quantity
            
          }
        }
      }
    }
  }
`
@inject("rootStore")
@observer
export class SingleVendorMenu extends React.Component<SingleVendorMenuProps, SingleVendorMenuState> {

  constructor(props) {
    super(props)
    this.state = {
      vendor : this.props.navigation.getParam('vendor', 'no_order_retrieved'),
      isLoading: true
    }
  }

  // Link to cart screen
  viewCartPush = () => {
    this.props.navigation.navigate("Cart")
  }

  async componentDidMount() {
    const eastWest = this.props.rootStore.vendorStore.addVendor(EastWestTeaWithoutProducts)
    const menu = await client.query({
      query: GET_MENU, 
      variables: {
        vendorName: this.state.vendor.name
      }
    })
    this.props.rootStore.vendorStore.initializeMenu(menu.data.vendor[0])
    this.setState({isLoading: false})
  }

  render() {

    if (this.state.isLoading) {
      return (<LoadingScreen />)
    } else {
      return (
        <View style={css.screen.defaultScreen}>
  
          <View style={css.flatlist.container}>
  
            <Text style={css.text.menuHeaderText}>
                  { this.state.vendor.name }
              </Text>
  
              <Text style={css.text.bigBodyTextCentered}>
                  Select Items
              </Text>
  
              <FlatList
                  style={css.flatlist.container}
                  data= { this.state.vendor.products }
                  keyExtractor={(product, index) => product._id}
                  renderItem={({item}) => 
                      <MenuScreenItem product={item}/> 
                  }
                />
          </View>
  
          <PrimaryButton
              title ="View Cart"
              onPress = {this.viewCartPush}
            />
        </View>
        )
    }
  }
}
