import * as React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as css from "../../style";
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor } from '../../../components/temporary-mock-order';
import gql from 'graphql-tag'
import { client } from '../../../main';
import LoadingScreen from '../../LoadingScreen';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { BigMenuScreenItem } from '../../../components/big-menu-item';
import { Button } from 'react-native-elements';



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
    // await this.props.rootStore.vendorStore.initialize()
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
    // console.log(JSON.stringify(this.props.rootStore.vendorStore.vendors))

  }
  

	setModalVisible(visible) {
		this.setState({
			modalVisible: visible
		})
	}

  render() {
  // let locationOptions = this.props.rootStore.vendorStore.vendors[0].locationOptions

  // console.log("locationOptions");
  // console.log(locationOptions);
  
	let products = this.state.products;
  var viewCartButton = 
  (
  <View style={{width: "100%"}}>
    <Button 
    containerStyle={{width: "100%", padding: 0, margin: 0, borderRadius: 0}}
    buttonStyle={{padding: 12}}
    title ={`View Cart (${this.props.rootStore.cartStore.cart.length} item${this.props.rootStore.cartStore.cart.length > 1 ? "s" : ""})`} 
    onPress = {this.viewCartPush} />
    </View>)

	if (this.state.isLoading) {
      return (<LoadingScreen/>)
    } else {
      return (
        <View style={{flex:1}}>
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
        </View>
        { this.props.rootStore.cartStore.cart.length !== 0 && viewCartButton }
        </View>
        )
    }
  }
}
