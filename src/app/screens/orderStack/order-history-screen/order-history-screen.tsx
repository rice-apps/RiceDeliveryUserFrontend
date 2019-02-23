import * as React from 'react'
import { Button, View, FlatList} from 'react-native';
import * as css from "../../style";
import { NavigationScreenProps } from 'react-navigation'
import Order, { mock_orders } from '../../../components/temporary-mock-order';
import OrderHistItem from '../../../components/order-hist-item';
import PrimaryButton from '../../../components/primary-button.js';


// List of orders for each page
const orders = [
	[
		mock_orders.order3,
		mock_orders.order1,
		mock_orders.order2,
	],
	[
		mock_orders.order2,
		mock_orders.order3,
	],
	[
		mock_orders.order1,
	],
]


export class OrderHistoryScreen extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			orders : orders[0],
			idx : 0,
		}
	}

	// Handle older orders button
	olderOrdersPush = () => {
		this.setState((state, props) => {
			if (state.idx < orders.length - 1) {
				++state.idx;
				return {
					orders: orders[state.idx],
					idx : state.idx
				};	
			}
		  });
	}

	// Handle recent orders button
	recentOrdersPush = () => {
		this.setState((state, props) => {
			if (state.idx > 0) {
				--state.idx;
				return {
					orders: orders[state.idx],
					idx : state.idx
				};	
			}
		  });
	}

	render() {

		let { orders } = this.state;

		return (
		<View style={css.screen.defaultScreen}>
				<FlatList
					style={css.flatlist.container}
					data = {orders}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({item}) => 
						<OrderHistItem style={css.text.itemText} order={item}/> 
					}
				/>

				<View>
					<PrimaryButton 
						title={"Older Orders"}
						onPress = {this.olderOrdersPush}
					/>
					<PrimaryButton 
						title={"More Recent Orders"}
						onPress = {this.recentOrdersPush}
					/>
				</View>

		</View>
		);
  }
}
