import {types, destroy, getSnapshot, flow} from "mobx-state-tree"
import { client } from "../main"
import gql from "graphql-tag"
import { nullType } from "mobx-state-tree/dist/internal";


const GET_HOURS = gql`
query vendor($name: String){
    vendor(name:$name){
        hours
    }
}
`


const GET_VENDORS = gql`
query vendor{
    vendor {
        name
        hours
        phone
        products {
          id
          name
          active
          attributes
          caption
          images
          skuItems {
            id
            active
            attributes {
              key
              value
            }
            image
            inventory {
              type
              value
            }
            price
            product
          }
          description
        }
        locationOptions{
            _id
          name
        }
      }
    }
    `

const Inventory = types
.model("Inventory", {
    quantity: types.maybe(types.number),
    type: types.string,
    value: types.string,
})

const AttributePair = types
.model("AttributePair", {
    key: types.string,
    value: types.string,
})

const SKU = types
.model("SKU", {
    id: types.string,
    active: types.boolean,
    attributes: types.array(AttributePair),
    image: types.maybe(types.string),
    inventory: Inventory,
    price: types.number,
    product: types.string,
})



const Product = types
.model("Product", {
    id: types.string,
    name: types.string,
    caption: types.string,
    // active: types.boolean,
    attributes: types.array(types.string),
    images: types.array(types.string),
    skuItems: types.array(SKU),
    description: types.maybe(types.string),
})

export const Location = types
.model("Location", {
    _id: types.string,
    name: types.string,
})



const Vendor = types
.model("Vendor", {
    name: types.string,
    phone: types.string,
    hours: types.array(types.optional(types.array(types.number), [])),
    locationOptions: types.array(Location),
    products: types.optional(types.array(Product),[])
}).actions(self => ({
    initializeProducts(products) {
        self.products = products
    },
}))

export const VendorStoreModel = types
.model("VendorStoreModel", {
    vendors: types.array(Vendor), 
    activeVendor: "",
    hours_transformed: types.array(types.optional(types.array(types.array(types.number)), [])),
    open: false,
}).actions(self => ({
    async initialize() {
        let vendors = await client.query({
            query: GET_VENDORS,
        });
        vendors.data.vendor.filter(
            (item, idx) => item.name == "East West Tea" // filtering out the Hoot for now..
        ).map((item, idx) => {
            self.addVendor(item);
        })
    },
    setHourTransformed(transformedArr){
        console.log("we are setting this transformed arr: " + transformedArr)
        self.hours_transformed = transformedArr;
    },
    addVendor(vendor) {
        self.vendors.push(vendor)
    },
    check_open(new_day){
        console.log("check_open")
        let day_idx = new_day.getDay()
        if (day_idx == 0) {
            day_idx = 7
        } else {
            day_idx -= 1
        }
        let checker = false
        console.log(JSON.stringify(self.hours_transformed))
        self.hours_transformed[day_idx].map(x => {
            console.log(x[0], new_day.getHours(), x[1])
            if (x[0] < new_day.getHours() && new_day.getHours() < x[1]){
                console.log(x[0], new_day.getHours(), x[1])
                checker = true
            }
        })

        console.log("THIS IS THE STATE: " + checker)
        self.setOpen(checker)
    },
    setOpen(status){
        self.open = status
    },

    updateHours(hours){
        self.vendors[0].hours = hours
    },
    async getHours(){
        let vendor_hours = await client.query({
            query: GET_HOURS,
            variables:{
                name: "East West Tea"
            }
        })        
        self.setHours(vendor_hours.data.vendor[0].hours)
        
    },
    setActiveVendor(vendor) {
        self.activeVendor = vendor
    },
    setHours(new_hours){
        self.vendors[0].hours = new_hours
        // self.vendors[0].hours.map(x => console.log(x))
    },
    initializeMenu(menuData) {
        const vendor = self.vendors.filter(vendor => vendor.name === menuData.name)

        if (!vendor) {
            throw Error("ERROR: vendor not initialized")
        }
        // if vendor menu is initialized and menu is not
        vendor[0].initializeProducts(menuData.products)
        return vendor[0].products
    },
})).views(self => ({
    vendor(vendorName) {
        return self.vendors.filter(vendor => vendor.name === vendorName)[0]
    },
}))

export type VendorStore = typeof VendorStoreModel.Type