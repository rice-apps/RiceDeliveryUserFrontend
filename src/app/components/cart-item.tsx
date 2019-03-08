import * as React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as css from '../screens/style';


interface CartScreenItemProps {
    text : {
        left : string
        right : string
        middle : string
    }
}

// Should we always define the input props/state for components instead of <any, any>???
export class CartScreenItem extends React.Component<CartScreenItemProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        var {left, middle, right} = this.props.text;
        return (
            <View style={{
                padding: 10,
                width: "100%",
                flex: 1,
                backgroundColor: "white",
                flexDirection: 'row',
                justifyContent: 'space-between',
                // borderWidth : 5,
                // borderColor : 'red'
              }}>

                <View style={{
                    justifyContent: 'flex-start',
                    flex : 1,
                    flexDirection : 'row'  
                }}>
                        <View style={{
                            width : "10%"
                        }}>
                                <Text style={css.text.bodyText}>
                                        {left}
                                </Text>
                        </View>

                                <Text style={css.text.bodyText}>
                                    {middle}
                                </Text>
                </View>


            <View style={{
                width : "20%",
            }}>
                    <Text style={css.text.bodyText}>
                        {right}
                    </Text>
              </View>
              </View>
        
        )
    }
}
