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


const flatMap = (f,xs) =>
  xs.map(f).reduce(concat, [])

function eliminateDuplicates(arr) {
var i,
    len = arr.length,
    out = [],
    obj = {};

for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
}
for (i in obj) {
    out.push(i);
}
return out;
}
  


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
            description: "",
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
            productName : this.props.product.name,
            productID : this.props.product.id,
            sku : prod.id,
            attributes : [attrOne, attrTwo],
            price : prod.price,
            description : this.state.description ? this.state.description : "",
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


    getPossibleAttributeValues(keyAttribute, product) {
        let list = product.skuItems.flatMap((skuItem=> 
            skuItem.attributes.filter((attribute) => attribute.key == keyAttribute)
            .map((attribute) => attribute.value)
        ));
        return(eliminateDuplicates(list));
    }

    render() {
        let {cartItems} = this.props.product;
        let sizes = this.getPossibleAttributeValues("size", this.props.product)
        let toppings = this.getPossibleAttributeValues("topping", this.props.product)

        let sizePickerItems = sizes.map((size, i) => <Picker.Item key={i} value={size} label= {size} />);

        let toppingPickerItems = toppings.map((topping, i) => <Picker.Item key={i} value={topping} label= {topping}/>);

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
                        {sizePickerItems}
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
                        {toppingPickerItems}
                        </Picker>

                    <Text>
                        Additional note:
                    </Text>

                        <TextInput
                        style={{margin : 4, padding : 2, height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({description : text})}
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
