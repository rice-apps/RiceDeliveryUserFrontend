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
                paddingLeft: 5,
                paddingRight: 20,
                width: "100%",
                flex: 1,
                backgroundColor: "white",
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                    <Text style={css.text.bigBodyText}>
                            {left}
                    </Text>
                    <Text style={css.text.bigBodyText}>
                        {middle}
                    </Text>
                    <Text style={css.text.bigBodyText}>
                        {right}
                    </Text>
            </View>
        
        )
    }
}
