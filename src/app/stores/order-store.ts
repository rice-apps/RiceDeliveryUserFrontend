import { types, destroy } from "mobx-state-tree";
import { Location, MenuItem } from "./vendorStore";
import { client } from "../main";
import gql from "graphql-tag";

const GET_ORDERS = gql`
    
        query GetOrders($netid: String!) {
            user(netid: $netid) {
                netid
                orders{
                    _id
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
                    status {
                        pending
                        onTheWay
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

const OrderStatus = types
.model('OrderStatus', {
    pending: types.optional(types.string, "0"),
    onTheWay: types.optional(types.null, null)
});

const Order = types
.model('Order', {
    location: Location,
    items: types.array(OrderItem),
    vendor: types.string,
    user: types.string,
    status: types.optional(OrderStatus, {pending: "0", onTheWay: null})
})

export const OrderStoreModel = types
.model('OrderStoreModel', {
    orders : types.array(Order)
})
.actions(
    (self) => ({
        startOrderPolling(netid) {
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
            console.log(data);
            let formattedOrders = data.user[0].orders
            .map(x => ({
                location: x.location, 
                items: x.items,
                vendor:x.vendor._id, 
                user:x.user.netid,
                status: x.status
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




 export type OrderStore = typeof OrderStoreModel.Type
 export type OrderItemStore = typeof OrderItem.Type
