import { types, destroy } from "mobx-state-tree";
import { Location } from "./vendorStore";
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
    item: types.string,
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
        async getOrders(netid) {
            // let orders : any = await client.query({
            //     query: GET_ORDERS,
            //     variables: {netid: netid}
            // });
            let orders = self.orders;
            let observable = await client.watchQuery({
                query: GET_ORDERS,
                variables: { netid: netid },
                pollInterval: 100
            });
            observable.subscribe({
                next: ({ data }) => {
                    let formattedOrders = data.user[0].orders
                    .map(x => ({
                                location: x.location, 
                                items: x.items,
                                vendor:x.vendor._id, 
                                user:x.user.netid}));
                    orders = formattedOrders;
                    console.log({orders: formattedOrders});
                    // return {orders: formattedOrders};
                }
            });
            self.orders = orders;
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




 export type OrderStore = typeof OrderStoreModel.Type
