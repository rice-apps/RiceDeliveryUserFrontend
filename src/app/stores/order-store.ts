import { types, destroy } from "mobx-state-tree";
import { Location, MenuItem } from "./vendorStore";
import { client } from "../main";
import gql from "graphql-tag";

const GET_ORDERS = gql`
    
        query GetOrders($netid: String!) {
            user(netid: $netid) {
                orders{
                    location{
                        name
                    }
                    items{
                        item{
                            id
                            name
                        }
                        quantity
                    }
                    vendor{
                        _id
                    }
                    user{
                        netid
                    }
                }
            }
        }
    
`

const OrderItem = types
.model('OrderItem' , {
    item: MenuItem,
    quantity: types.number
})

const Order = types
.model('Order', {
    location: Location,
    items: types.array(OrderItem),
    vendor: types.string,
    user: types.string
})

export const OrderStoreModel = types
.model('OrderStoreModel', {
    orders : types.array(Order)
})
.actions(
    (self) => ({
        startOrderPolling(netid) {
            // let orders : any = await client.query({
            //     query: GET_ORDERS,
            //     variables: {netid: netid}
            // });

            // let formattedOrders = orders.data.user[0].orders
            // .map(x => ({
            //     location: x.location, 
            //     items: x.items,
            //     vendor:x.vendor._id, 
            //     user:x.user.netid
            // }));
            // self.orders = formattedOrders;
            // let orders = self.orders;
            let observable = client.watchQuery({
                query: GET_ORDERS,
                variables: { netid: netid },
                pollInterval: 100
            });
            console.log("Started polling!");
            observable.subscribe({
                next: ({ data }) => self.updateOrderStore(data)
            });
        },
        updateOrderStore(data) {
            console.log("Updating store!");
            let formattedOrders = data.user[0].orders
            .map(x => ({
                location: x.location, 
                items: x.items,
                vendor:x.vendor._id, 
                user:x.user.netid
            }));
            console.log(formattedOrders);
            self.orders = formattedOrders;
        }
    })
)

// .actions(
//     (self) => ({
//         async getUsers() {
//             // Fetch from backend
//             let users = await client.query({
//                 query: GET_USERS
//             });
//             console.log(users);
//             return users;
//         }
//     })
// )


export type Order = typeof Order.Type

export type OrderStore = typeof OrderStoreModel.Type
