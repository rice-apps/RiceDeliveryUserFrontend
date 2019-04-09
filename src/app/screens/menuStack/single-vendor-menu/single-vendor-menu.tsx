import * as React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor, EastWestTea, EastWestTeaWithoutProducts } from '../../../components/temporary-mock-order';
import gql from 'graphql-tag'
import { client } from '../../../main';
import LoadingScreen from '../../LoadingScreen';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { BigMenuScreenItem } from '../../../components/big-menu-item';



interface SingleVendorMenuState {
  vendor : Vendor,
  products : ProductModel[],
  isLoading: boolean,
  modalVisible: boolean,
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
      isLoading: true,
      modalVisible: false,
      products : null,
    }
  }

  // Link to cart screen
  viewCartPush = () => {
    this.props.navigation.navigate("Cart")
  }

  // Query and set state when component mounts
  // Initializes the menu in the vendor store
  async componentDidMount() {
    this.props.rootStore.vendorStore.addVendor(EastWestTeaWithoutProducts)
    // this.getProductMapping(products)
    const menu = await client.query({
      query: GET_MENU, 
      variables: {
        vendorName: this.state.vendor.name,
      },
    })
    this.setState({
      products : menu.data.vendor[0].products, isLoading: false
    })
    this.props.rootStore.vendorStore.initializeMenu(menu.data.vendor[0])


  }
  

	setModalVisible(visible) {
		this.setState({
			modalVisible: visible
		})
	}

  render() {

	let products = this.state.products;
  var viewCartButton = <PrimaryButton title ="View Cart" onPress = {this.viewCartPush} />

	if (this.state.isLoading) {
      return (<LoadingScreen/>)
    } else {
      return (
        <View style={[css.screen.defaultScreen, this.state.modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : {}]}>
          <View style={css.flatlist.container}>
            <Text style={css.text.menuHeaderText}>
                  { this.state.vendor.name }
              </Text>
              <FlatList
                  style={css.flatlist.container}
                  data= {products}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <BigMenuScreenItem product={item}/>}
                />
          </View>
		      { viewCartButton }
        </View>
        )
    }
  }
}
