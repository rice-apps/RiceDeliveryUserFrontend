import * as React from 'react'
import { Text, Picker, View} from "react-native"
import * as css from '../../style';
import PrimaryButton from '../../../components/primary-button';
import { RootStore } from '../../../stores/root-store';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProps } from 'react-navigation'
import { client } from '../../../main'
import gql from 'graphql-tag'
export interface LocationInfoScreenProps extends NavigationScreenProps<{}> {
	rootStore?: RootStore
      }
      
@inject("rootStore")
@observer
export class LocationInfoScreen extends React.Component<LocationInfoScreenProps, {location: String}> {
	constructor(props) {
		super(props)
		this.state = {
			location : "" // TODO: change this to be a Location object
		}
	}

	async updateLocation() {
		const updatedUserInfo = await client.mutate({
			mutation: gql`
			mutation mutate($data: UpdateUserInput!) {
			  updateUser(data: $data) {
			    netID
			    firstName
			    lastName
			    phone
			  }
			}
			`
			, 
			variables : {
			  data: {
			    location: this.state.location
			}
		      }
		});
	}

  	render() {

	return (
	<View style={css.screen.paddedScreen}>
			<View style={css.screen.accountScreenContainer}>
				<View style= {{
					flex: 1,
					flexDirection : "column",
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
				</View>
			</View>
			<PrimaryButton
				title ="Update Default Location"
				onPress = {this.updateLocation()}
			/>
		</View>
	)
  }
}
