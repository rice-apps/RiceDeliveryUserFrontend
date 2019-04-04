import {types, destroy, getSnapshot, flow} from "mobx-state-tree"
import { client } from "../main"
import gql from "graphql-tag"

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
    products: types.optional(types.array(Product),[]),
}).actions(self => ({
    initializeProducts(products) {
        self.products = products
    },
}))

export const VendorStoreModel = types
.model("VendorStoreModel", {
    vendors: types.array(Vendor), 
    activeVendor: "",
}).actions(self => ({
    async initialize() {
        let vendors = await client.query({
            query: GET_VENDORS,
        });
        vendors.data.vendor.filter(
            (item, idx) => item.name == "East West Tea" // filtering out the Hoot for now..
        ).map((item, idx) => {
            self.addVendor(item);
            // self.vendors.push(item);
        })
    },
    addVendor(vendor) {
        self.vendors.push(vendor)
    },
    setActiveVendor(vendor) {
        self.activeVendor = vendor
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