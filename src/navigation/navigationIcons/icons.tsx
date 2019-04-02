import Icon from "react-native-vector-icons/Ionicons"
// import Icon from 'react-native-vector-icons/MaterialIcons'
import React from "react"

const iconSize = 20

const pendingOrdersIcon = () => (<Icon name="ios-pizza" size={iconSize}/>)
const currentBatchesIcon = () => (<Icon name="ios-cart" size={iconSize}/>)
const accountIcon = () => (<Icon name="ios-settings" size={iconSize}/>)

export {currentBatchesIcon, pendingOrdersIcon, accountIcon}