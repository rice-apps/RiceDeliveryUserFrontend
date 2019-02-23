import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';
import { Product } from '../components/temporary-mock-order';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface MenuScreenItemProps {
    product : Product
}

// Should we always define the input props/state for components instead of <any, any>???
export class MenuScreenItem extends React.Component<MenuScreenItemProps, any> {
    constructor(props) {
        super(props);
    }

    toggleItem() {

    }

    render() {
        var {name, images, description, skuItems} = this.props.product;

        return (
            <View style={css.container.menuItem}>
                <View>
                    <Text style={css.text.bodyText}> {name} </Text>
                </View>

                <View>
                    <View style={{flex : 1, flexDirection : "row",
                        justifyContent: "flex-end"}}>

                        <TouchableHighlight 
                        style = {css.container.iconHighlight}
                        onPress={this.toggleItem}>
                                <Icon name="add" size={25} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight 
                        style = {css.container.iconHighlight}
                        onPress={this.toggleItem}>
                                <Icon name="remove" size={25} color="black" />
                        </TouchableHighlight>

                        <Text style={css.text.bodyText}>
                            1
                        </Text>

                    </View>
                </View>

            </View>
        )
    }
}
