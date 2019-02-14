import {types, destroy} from "mobx-state-tree";
import { Location } from "./location-store"
import { client } from '../main';
import gql from "graphql-tag";

const Inventory = types
.model('Inventory', {
    quantity: types.number,
    type: types.string,
    value: types.string
})

const AttributePair = types
.model('AttributePair', {
    key: types.string,
    value: types.string
})

const SKU = types
.model('SKU', {
    active: types.boolean,
    attributes: types.array(AttributePair),
    image: types.string,
    inventory: Inventory,
    price: types.number,
    product: types.string
})

const Product = types
.model('Product', {
    active: types.boolean,
    attributes: types.string,
    caption: types.string,
    images: types.array(types.string),
    skuItems: types.array(SKU),
    description: types.string
})

const Vendor = types
.model('Vendor', {
    name: types.string,
    phone: types.string,
    locationOptions: types.array(Location),
    products: types.array(Product)
})

export const VendorStoreModel = types
.model('VendorStoreModel', {
    vendor: types.array(Vendor)
})

export type VendorStore = typeof VendorStoreModel.Type