import * as React from 'react'
import { View, Text, FlatList, ImageEditor } from 'react-native';
import { Divider } from 'react-native-elements';
import * as css from "../../style";
import { VendorStoreModel } from '../../../stores/vendor-store';
import PrimaryButton from '../../../components/primary-button.js'
import { Vendor } from '../../../components/temporary-mock-order';
import { MenuScreenItem } from '../../../components/menu-item';
import gql from 'graphql-tag'
import { client } from '../../../../app/main'
import { CartItem, CartItemModel, SKUAtributesModel, CartStoreModel } from '../../../stores/cart-store'

// interface SingleVendorMenuState {
//   vendor : Vendor
// }

const GET_MENU = gql`
query getMenu($name: String!) {
  vendor(name: $name) {
    name
    products {
      id
      name
      active
      skuItems {
        id
        price
        product
        attributes {
          key
          value
        }
      } 
    }
  }
}
`

export class SingleVendorMenu extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      vendor : this.props.navigation.getParam('vendor', 'no_order_retrieved'),
      cartMap: new Map
    }
  }

  // Link to cart screen
  viewCartPush = () => {
    this.props.navigation.navigate("Cart")
  }

  // Parses the Json object into a mapping of 
  // [Product, attribute, attribute] => CartItem
  getProductMapping(products) {
    for (let index = 0; index < products.length; index++) {
      let product = products[index];
      console.log("big loop");
      for (let sku = 0; sku < product.skuItems.length; sku++) {
        let skuItem = product.skuItems[sku]
        let mapArray = [product.name, skuItem.attributes[0].value, skuItem.attributes[1].value ];

        let attrOne = SKUAtributesModel.create({
          key: skuItem.attributes[0].key,
          value: skuItem.attributes[0].value
        })

        let attrTwo = SKUAtributesModel.create({
          key: skuItem.attributes[1].key,
          value: skuItem.attributes[1].value
        })

        let cartItem = CartItemModel.create({
          productName: product.name, 
          productID: product.id,
          sku: skuItem.id, 
          attributes: [attrOne, attrTwo]
        })

        // Set the cart map.
        this.state.cartMap.set(mapArray, cartItem);
      }

      console.log(this.state.cartMap);
    }
  }
  
  async getMenu() {
    const info : any = await client.query({
      query: GET_MENU, 
      variables: {
        name: this.state.vendor.name
      } 
    })
    let products = info.data.vendor[0].products;

    // Parse East-West products and skuItems.
    this.getProductMapping(products);
  }

  componentDidMount() {
      this.getMenu();
      console.log("mountinggg");
   }

  render() {
    var vendor = this.state.vendor;
    var { name, products } = vendor;

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.flatlist.container}>

          <Text style={css.text.menuHeaderText}>
                { name }
            </Text>

            <Text style={css.text.bigBodyTextCentered}>
                Select Items
            </Text>

            <FlatList
                style={css.flatlist.container}
                data= { products }
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
