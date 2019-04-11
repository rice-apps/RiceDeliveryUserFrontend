import Icon from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from "react"
const pendingOrdersIcon = () => <MaterialCommunityIcons name="food-fork-drink" size={20}/>
const currentBatchesIcon = () => <Icon name="ios-cart" size={20}/>
const accountIcon = () => <Icon name="ios-settings" size={20}/>

export {currentBatchesIcon, pendingOrdersIcon, accountIcon}