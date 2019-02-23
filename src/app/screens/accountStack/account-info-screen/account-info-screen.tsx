import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import * as css from '../../style';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


export class AccountInfoScreen extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.changePasswordPush = this.changePasswordPush.bind(this)
	}

	changePasswordPush() {
        this.props.navigation.navigate("ChangePassword");
	}

  render() {

    return (
      <View style={css.screen.defaultScreen}>
      		<View style={css.screen.accountScreenContainer}>

          <View style={{
            flex : .5,
            flexDirection : "column",
            justifyContent : "space-between"
          }}>

          <Text style={css.text.bigBodyText}>First Name</Text>
            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>Last Name</Text>
            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>Phone Number</Text>
            <Divider style={css.screen.divider} />

            <Text style={css.text.bigBodyText}>Email</Text>
            <Divider style={css.screen.divider} />

            <View style={{
				flex : .2,
				flexDirection : "row",
				justifyContent : "space-between",
			}}>
              <Text style={css.text.bigBodyText}>Change Your Password</Text>
			  <TouchableHighlight 
			  style={{padding : 0}}
			  onPress={this.changePasswordPush}
			  >
				<Icon name="chevron-right" size={30} color="black" />
			  </TouchableHighlight>
            </View>

          </View>
          </View>
      </View>
    )
  }
}
