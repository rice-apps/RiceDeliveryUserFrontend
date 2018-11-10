import { types, destroy } from "mobx-state-tree";
import { Location } from "./vendorStore";
import { client } from "../main";
import gql from "graphql-tag";

const GET_ORDERS = gql`
    {
        query user($netid: String!) {
            user(netid: $netid) {
                orders{
                    location{
                        name
                    }
                    items{
                        item{
                            id
                        }
                        quantity
                    }
                    vendor{
                        id
                    }
                    user{
                        netid
                    }
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
            let orders = await client.query({
                query: GET_ORDERS,
                variables: {netid: netid}
            });
            console.log(orders);
            return orders;
        }
    })
)

 export type OrderStore = typeof OrderStoreModel.Type
