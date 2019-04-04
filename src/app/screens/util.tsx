export function getOrderTime(order) {
	let { orderStatus } = order

	var statusDisplay = orderStatus.pending ? "pending" : "cancelled"
	statusDisplay = orderStatus.onTheWay ? "on the way" : statusDisplay
	statusDisplay = orderStatus.fulfilled ? "fulfilled" : statusDisplay
	statusDisplay = orderStatus.unfulfilled ? "unfulfilled" : statusDisplay

	var time
	switch(statusDisplay) {
		case "pending":
			time = orderStatus.pending
			break
		case "on the way":
			time = orderStatus.onTheWay
			break
		case "fulfilled":
			time = orderStatus.fulfilled
			break
		case "unfilfilled":
			break
		default:
	}
	var date = new Date(0)
	if (!orderStatus.unfulfilled) {
		date.setUTCSeconds(time)
	}
	return date
}

export function getStatusDisplayColor(order) {
    let {location, orderStatus} = order

    var statusDisplay = orderStatus.pending ? "pending" : "cancelled"
    statusDisplay = orderStatus.onTheWay ? "on the way" : statusDisplay
    statusDisplay = orderStatus.fulfilled ? "fulfilled" : statusDisplay
    statusDisplay = orderStatus.unfulfilled ? "unfulfilled" : statusDisplay

    var statusColor 
    switch(statusDisplay) {
        case "pending":
            statusColor = "orange"
            break
        case "on the way":
            statusColor = "yellow"
            break
        case "fulfilled":
            statusColor = "green"
            break
        case "unfilfilled":
            statusColor = "red"
            break
        default:
            statusColor = "grey"
    }
    return {
        color : statusColor, 
        status : statusDisplay,
    }
} 