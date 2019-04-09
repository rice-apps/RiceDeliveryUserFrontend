import { Button } from 'react-native-elements'
import React from 'react'
// import * as css from "./style.ts";

export default class PrimaryButton extends React.Component {
    render() {
        const {title, onPress, disabled} = this.props;
        // disabled = (disabled!=undefined) ? disabled : false
        return (
            <Button
                title = {title}
                disabled = {disabled}
                // buttonStyle={css.button.primaryButton}
                style={{margin: 10}}
                onPress = {onPress}

            />
        )
    }
}