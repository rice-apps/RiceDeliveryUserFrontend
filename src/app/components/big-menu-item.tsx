import * as React from 'react'
import { Modal, Text, View, TextInput, TouchableHighlight, Picker, TouchableOpacity } from 'react-native';
import * as css from '../screens/style';
import { inject, observer } from 'mobx-react';
import { client } from '../main';
import gql from 'graphql-tag';
import { SmallMenuScreenItem } from './small-menu-item';
import PrimaryButton from './primary-button.js';
import { RootStore } from '../stores/root-store';
import { CartItemModel , SKUAtributesModel } from '../stores/cart-store';


// import { MenuItemModal } from './menu-item-modal';

interface BigMenuScreenItemProps {
    product : any
    rootStore: RootStore,
}

@inject("rootStore")
@observer
export class BigMenuScreenItem extends React.Component<BigMenuScreenItemProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            toggleDrop : false,
            client: client,
            modalVisible: false,
            size: "Medium",
            topping: "None",
            note: "",
        }
        this.onTouchablePress = this.onTouchablePress.bind(this);
    }
    
    onTouchablePress() {
        this.setState({
            toggleDrop : !this.state.toggleDrop
        })
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    addToCart(size, topping) {
        let prod = this.findSKU(size, topping, this.props.product.caption);
        let { attributes } = prod;
        let attrOne = SKUAtributesModel.create({
            key: attributes[0].key,
            value: attributes[0].value
          })
          let attrTwo = SKUAtributesModel.create({
            key: attributes[1].key,
            value: attributes[1].value
          })
  
        let cartItem = CartItemModel.create({
            productName : this.props.product.caption,
            productID : this.props.product.id,
            sku : prod.id,
            attributes : [attrOne, attrTwo],
            price : prod.price,
            note : this.state.note,
        });
        this.props.rootStore.cartStore.addToCart(cartItem);
    }

    findSKU(size, topping, productName) {
        let products = this.props.rootStore.vendorStore.vendors[0].products;
        var product = products.filter((item) => item.caption == productName)[0];
        var correctCartItems = product.skuItems.filter((item) => {
            let attributes = item.attributes;
            let sizeAttr = attributes.filter((attr) => attr.key == "size");
            let toppingAttr = attributes.filter((attr) => attr.key == "topping");
            return (sizeAttr[0].value == size && toppingAttr[0].value == topping)
        })
        return correctCartItems[0]
    }

    render() {
        let {cartItems} = this.props.product;

        return (
            <View>
                <TouchableHighlight onPress= {() => {
                    this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <View style={css.container.bigMenuItem}>
                        <Text style={css.text.bodyText}> {this.props.product.name} </Text>
                    </View>
            </TouchableHighlight>

            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            >
                <TouchableOpacity 
                        activeOpacity={1} 
                        onPressOut={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                    >
                <View style={css.screen.defaultScreenPopup}>

                    <View style={{
                        marginLeft: 20,
                        marginRight: 20,
                        padding: 40,
                        backgroundColor: "white",
                        borderRadius: 14,
                    }}>
                    <Text>
                        Size:
                    </Text>
                    <Picker
                        selectedValue={this.state.size}
                        itemStyle={{height: 60}}
                        style = {{height: 60, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({size: itemValue})
                        }>
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Large" value="Large" />
                        </Picker>

                    <Text>
                        Topping:
                    </Text>

                        <Picker
                        selectedValue={this.state.topping}
                        itemStyle={{ height: 60 }}
                        style = {{height: 60, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({topping: itemValue})
                        }>
                        <Picker.Item label="None" value="None" />
                        <Picker.Item label="Boba" value="Boba" />
                        <Picker.Item label="Lychee" value="Lychee" />
                        <Picker.Item label="Oreo" value="Oreo" />
                        </Picker>

                    <Text>
                        Additional note:
                    </Text>

                        <TextInput
                        style={{margin : 4, padding : 2, height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({note : text})}
                        value={this.state.text}
                        />

                    <PrimaryButton
                        title ="Add to Cart"
                        onPress = {() => {
                            this.setModalVisible(!this.state.modalVisible);
                            this.addToCart(this.state.size, this.state.topping)
                        }}
                    />

                    </View>
                </View>
                </TouchableOpacity>     
            </Modal>
            </View>

        )
    }
}
