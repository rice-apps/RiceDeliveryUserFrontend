import * as React from 'react'
import { View, Text, Picker } from 'react-native';
import * as css from "../../style";
import { Divider } from 'react-native-elements';


export class CheckoutScreen extends React.Component<any, any> {

  constructor(props) {
    super(props) 
    this.state = {
      location : "Nowhere"
    }
  }

  render() {

    return (
      <View style={css.screen.defaultScreen}>

        <View style={css.screen.singleOrderDisplay}>
            <Text style={css.text.headerText}>
                Delivery details
            </Text> 

            <Text style={css.text.bigBodyText}>
              Location
            </Text>

            <View style={
				{flex : 1,
					height: 10, 
					width: 110, 
				}
			}>
				<Picker
					selectedValue={this.state.language}
					style={{
						height: 1, 
						width: 100, 
						padding: 0, 
						margin: 0,
					}}
					onValueChange={(itemValue, itemIndex) =>
					this.setState({language: itemValue})
					}>
					<Picker.Item label="Jones" value="jones" />
					<Picker.Item label="Martel" value="martel" />
					<Picker.Item label="Brown" value="brown" />
					<Picker.Item label="McMurtry" value="mcmurtry" />
					<Picker.Item label="Duncan" value="duncan" />
				</Picker>
            </View>

            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>
              Payment
            </Text>

            <View style={css.container.checkoutScreenContainer}>
            <Text style={css.text.itemText}>
                    Name
                </Text>
                <Text style={css.text.itemText}>
                    Email
                </Text>
                <Text style={css.text.itemText}>
                    Phone
                </Text>
            </View>

            <View style={css.container.checkoutScreenContainer}>
                <Text>
                    Card Number
                </Text>
            </View>

        </View>

      </View>
      )
  }
}
