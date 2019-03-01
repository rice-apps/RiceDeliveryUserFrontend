import * as React from 'react'
import { View, Text, FlatList, ImageEditor, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStore } from '../../../stores/vendor-store';
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor, EastWestTea, EastWestTeaWithoutProducts } from '../../../components/temporary-mock-order';
import { MenuScreenItem } from '../../../components/menu-item';
import gql from 'graphql-tag'
import { CartItem, CartItemModel, SKUAtributesModel, CartStoreModel } from '../../../stores/cart-store'
import { client } from '../../../main';
import LoadingScreen from '../../LoadingScreen';
import { observer, inject } from 'mobx-react';
import { Observer } from 'mobx-react/native'
import { RootStore } from '../../../stores/root-store';
import { NavigationScreenProp } from 'react-navigation';
import { getSnapshot } from 'mobx-state-tree';

// interface SingleVendorMenuState {
//   vendor : Vendor
// }

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
    console.log("Navigating")
    console.log(Array.from(this.props.rootStore.cartStore.cartMap.toJS().entries()))
  }

  // Parses the Json object into a mapping of 
  // [Product, attribute, attribute] => CartItem
  getProductMapping(products) {
    for (let index = 0; index < products.length; index++) {
      let product = products[index];
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
        let mapArray = `${product.name} ${attributes[0].value} ${attributes[1].value}`
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
        // Set the cart map in MobX store
        this.props.rootStore.cartStore.addCartIem(mapArray, cartItem)
      }

    }
  }
  
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

  renderItem = ({item}) => {
    return <MenuScreenItem product={item}/>
  };

  render() {
    console.log("rendering single")
    // Test array
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
                  data= {Array.from(this.props.rootStore.cartStore.cartMap.toJS().entries())}
                  keyExtractor={(item, index) => item[1].sku}
                  renderItem={this.renderItem}
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
