import * as React from "react"
import { Text, View} from "react-native"
import * as css from "../../style"
import PrimaryButton from "../../../components/primary-button.js"
import { Divider } from "react-native-elements"

export class ChangePasswordScreen extends React.Component<any, any> {
	constructor(props) {
		super(props)
    }
    
    changePasswordPush() {

    }

  render() {

    return (
      <View style={css.screen.defaultScreen}>

		<View style={css.screen.accountScreenContainer}>
        <View style={{
            flex : .5,
            flexDirection : "column",
            justifyContent : "space-between",
          }}>

          <Text style={css.text.bigBodyText}>Old</Text>
            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>New</Text>
            <Divider style={css.screen.divider} />


            <PrimaryButton
            title ="Change Password"
            onPress = {this.changePasswordPush}
            />

            </View>
        </View>
	</View>
    )
  }
}
