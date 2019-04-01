import * as React from "react"
import { Text, Picker, View} from "react-native"
import * as css from "../../style"
import PrimaryButton from "../../../components/primary-button.js"

export class LocationInfoScreen extends React.Component<any, any> {
	constructor(props) {
		super(props)
		this.state = {
			location : "nowhere",
		}
	}

	saveChangePush() {
		// We need to make a call to save this.state.location to this user's configs
	}

  render() {

    return (
      <View style={css.screen.defaultScreen}>

		<View style={css.screen.accountScreenContainer}>
			<Text style={css.text.accountHeaderText}>
				Change default delivery location
			</Text>

			<View style= {{
				alignItems : "center",
			}}>
			<Picker
				selectedValue={this.state.location}
				style={{
					height: 1, 
					width: 100, 
					padding: 0, 
					margin: 0,
				}}
				onValueChange={(itemValue, itemIndex) =>
				this.setState({location: itemValue})
				}>
				<Picker.Item label="Jones" value="jones" />
				<Picker.Item label="Martel" value="martel" />
				<Picker.Item label="Brown" value="brown" />
				<Picker.Item label="McMurtry" value="mcmurtry" />
				<Picker.Item label="Duncan" value="duncan" />
			</Picker>


				<PrimaryButton
				title ="Save Changes"
				onPress = {this.saveChangePush}
				/>

			</View>

		</View>
	</View>
    )
  }
}
