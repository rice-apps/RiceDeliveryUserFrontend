import * as React from 'react'
import { Modal, Text, View, TextInput, TouchableHighlight, Picker, TouchableOpacity, SegmentedControlIOS, TouchableWithoutFeedback, Dimensions, Alert} from 'react-native';
import * as css from '../screens/style';
import { inject, observer } from 'mobx-react';
import { client } from '../main';
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
            size: "",
            topping: "",
            description: "",
            missingOptions: false,
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

        if (!size || !topping) {
            this.setState({
                missingOptions : true
            })
            return false;
        }

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
        return true;
    }

    findSKU(size, topping, productName) {
        console.log(size + " " + topping + " " + productName)
        console.log(this.props.rootStore.vendorStore.vendors[0])
        let products = this.props.rootStore.vendorStore.vendors[0].products;
        console.log(products);
        var product = products.filter((item) => item.caption == productName)[0];
        console.log(product);
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

        let missingOptionsDisplay = 
        <Text>
            Please select both size and topping options.
        </Text>
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
                        >
                    <TouchableWithoutFeedback>
                    <View style={{
                        marginTop: 80,
                        marginLeft: 20,
                        marginRight: 20, 
                        padding: 20,
                        backgroundColor: "white",
                        borderRadius: 14,
                    }}>
                    <Text>
                        Size:
                    </Text>
                    <SegmentedControlIOS
                    style={{margin: 10}}
                    values ={sizes}
                    onValueChange={(itemValue) => {
                        this.setState({size: itemValue})
                    }}
                    />

                    <Text>
                        Topping:
                    </Text>

                    <SegmentedControlIOS
                    style={{margin: 10, flexDirection:'row'}}
                    values ={toppings}
                    selectedIndex = {this.state.selectedIndex}
                    onValueChange = {(itemValue) => {
                        this.setState({topping: itemValue});
                    }}
                    />

                    <Text>
                        Additional note:
                    </Text>

                        <TextInput
                        style={{margin : 4, padding : 2, height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({description : text})}
                        value={this.state.text}
                        />

                        {this.state.missingOptions ? missingOptionsDisplay : null}

                    <PrimaryButton
                        title ="Add to Cart"
                        onPress = {() => {
                            if (this.addToCart(this.state.size, this.state.topping)) {
                                this.setModalVisible(!this.state.modalVisible);
                            } else {
                                console.log("Add to cart failed");
                            }
                        }}
                    />
                    <PrimaryButton
                        title="Cancel"
                        onPress={() => {
                            this.setModalVisible(false)
                        }}
                    />

                    </View>
                    </TouchableWithoutFeedback>
                    </TouchableOpacity>     
                </Modal>
            </View>

        )
    }
}
