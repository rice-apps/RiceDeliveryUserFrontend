import * as React from 'react'
import { View, Text, FlatList, ImageEditor, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStore } from '../../../stores/vendor-store';
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor, EastWestTea, EastWestTeaWithoutProducts } from '../../../components/temporary-mock-order';
import { MenuScreenItem } from '../../../components/menu-item';
import gql from 'graphql-tag'
import { CartItem, CartItemModel, SKUAtributesModel, CartStoreModel, ProductModel } from '../../../stores/cart-store'
import { client } from '../../../main';
import LoadingScreen from '../../LoadingScreen';
import { observer, inject } from 'mobx-react';
import { Observer } from 'mobx-react/native'
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { getSnapshot } from 'mobx-state-tree';
import { BigMenuScreenItem } from '../../../components/big-menu-item';

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

  // Parses each productItem's cartItems, and adds the nested structure
  // to the mobX state.
  getProductMapping(products) {
    for (var product of products) {
      for (let sku = 0; sku < product.skuItems.length; sku++) {
        let attributes = JSON.parse(JSON.stringify(product.skuItems[sku].attributes))
        // sort skuItem.attributes to maintain consistency in display name
        attributes.sort((a, b) => {
          let nameA = a.key.toLowerCase();
          let nameB = b.key.toLowerCase();
          if (nameA< nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        let attrOne = SKUAtributesModel.create({
          key: attributes[0].key,
          value: attributes[0].value
        })
        let attrTwo = SKUAtributesModel.create({
          key: attributes[1].key,
          value: attributes[1].value
        })
        let cartItem = CartItemModel.create({
          productName: product.name, 
          productID: product.id,
          sku: product.skuItems[sku].id, 
          attributes: [attrOne, attrTwo], 
          price: product.skuItems[sku].price,
          quantity: 0
        })
        // Add cartItem to MobX store
		var targetProduct = this.props.rootStore.cartStore.cart.find((elem) => 
			elem.productName == product.name);
        if (targetProduct != null) { // If productItem exists add to its cartItems
          targetProduct.addToCartItems(cartItem);
        } else { // If we have yet to add the productItem, add it (not yet tested)
          let productItem = ProductModel.create({
            productName : product.name,
            cartItems : [cartItem]
          })
          this.props.rootStore.cartStore.addCartIem(productItem);
        }
      }
    }
  }
  
  // Returns whether an item was selected from the menu
  // Used when toggling the "View Cart button"
  itemIsSelected = (arr) => {
	  return (
		arr.filter((productItem) => {
			return productItem.cartItems.filter((cartItem) => {
				return cartItem.quantity > 0;
			}).length > 0;
		}).length > 0);
  }

  // Query and set state when component mounts
  // Initializes the menu in the vendor store
  async componentDidMount() {
    this.props.rootStore.vendorStore.addVendor(EastWestTeaWithoutProducts)
    const menu = await client.query({
      query: GET_MENU, 
      variables: {
        vendorName: this.state.vendor.name
      }
	})
    this.getProductMapping(this.props.rootStore.vendorStore.initializeMenu(menu.data.vendor[0]))
    this.setState({isLoading: false})
  }

  // Render
  render() {
    let arr = this.props.rootStore.cartStore.cart;
    var viewCartButton = <PrimaryButton title ="View Cart" onPress = {this.viewCartPush} />

	if (this.state.isLoading) {
      return (<LoadingScreen />)
    } else {
      return (
        <View style={css.screen.defaultScreen}>
          <View style={css.flatlist.container}>
            <Text style={css.text.menuHeaderText}>
                  { this.state.vendor.name }
              </Text>
              <FlatList
                  style={css.flatlist.container}
                  data= {arr}
                  keyExtractor={(item, index) => item.productName}
                  renderItem={({item}) => <BigMenuScreenItem product={item}/>}
                />
          </View>
		  { this.itemIsSelected(arr) ? viewCartButton : null }
        </View>
        )
    }
  }
}
