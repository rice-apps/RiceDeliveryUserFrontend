import {types, destroy} from "mobx-state-tree";
import { client } from '../main';
import gql from "graphql-tag";

export const Location = types.model('Location', {name: types.string})

const SizePrice = types.model('SizePrice', {size: types.string, price: types.number})

export const MenuItem = types
.model('MenuItem', {
    id: types.string,
    name: types.string,
    description: types.optional(types.string, ""),
    inventory: types.optional(types.number, 0),
    prices: types.optional(types.array(SizePrice), [])
})

const Vendor = types
.model('Vendor', {
    _id: types.string,
    name: types.string,
    phone: types.string,
    locationOptions: types.array(Location),
    menu: types.array(MenuItem),
})

export const VendorStoreModel = types
.model('VendorStoreModel', {
    vendor: types.array(Vendor)
})

export type VendorStore = typeof VendorStoreModel.Type
export type MenuItem = typeof MenuItem.Type