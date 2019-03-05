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
  }

  // Parses the Json object into a mapping of 
  // [Product, attribute, attribute] => CartItem
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
        var targetProduct = this.props.rootStore.cartStore.cart.find((elem) => elem.productName == product.name);
        if (targetProduct != null) {
          targetProduct.addToCartItems(cartItem);
        } else {
          let productItem = ProductModel.create({
            productName : product.name,
            cartItems : [cartItem]
          })
          this.props.rootStore.cartStore.addCartIem(productItem);
        }
      }

    }
  }
  
  renderIf = (condition, content) => {
    console.log("IFF")
    if (condition) {
      return content
    } else {
      return null
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
    // return <MenuScreenItem product={item}/>
    return <BigMenuScreenItem product={item}/>
  };

  render() {
    let arr = this.props.rootStore.cartStore.cart;
    console.log(arr);
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
                  renderItem={this.renderItem}
                />
          </View>
          {/* {
            this.renderIf(arr.filter(pair => pair[1].quantity > 0).length > 0, <PrimaryButton
            title ="View Cart"
            onPress = {this.viewCartPush}
            />)
          } */}

        </View>
        )
    }
  }
}
