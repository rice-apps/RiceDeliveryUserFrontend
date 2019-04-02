import { types, destroy } from "mobx-state-tree"
import gql from "graphql-tag"

export const Location = types
.model("Location", {
    _id: types.string,
    name: types.string,
})
