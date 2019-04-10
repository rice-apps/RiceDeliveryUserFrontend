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
    statusDisplay = order.paymentStatus == "canceled" ? "refunded" : statusDisplay
    statusDisplay = order.paymentStatus == "returned" ? "refunded" : statusDisplay

    var statusColor 
    switch(statusDisplay) {
        case "pending":
            statusColor = "orange"
            break
        case "on the way":
            statusColor = "#ffd700"
            break
        case "fulfilled":
            statusColor = "green"
            break
        case "unfilfilled":
            statusColor = "red"
            break
        case "refunded":
            statusColor = "lightgreen"
            break
        case "refunded":
            statusColor = "#d3d3d3"
            break
        default:
            statusColor = "grey"
    }
    return {
        color : statusColor, 
        status : statusDisplay,
    }
} 