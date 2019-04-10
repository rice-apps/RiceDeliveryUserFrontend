import * as React from "react"
import { Text, View, StyleSheet, TouchableHighlight } from "react-native"
import { withNavigation } from "react-navigation"
import * as css from "../screens/style"
import { Button } from 'react-native';

// Should we always define the input props/state for components instead of <any, any>???
class SingleVendorButton extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.onVendorPress = this.onVendorPress.bind(this)
        this.state = {
            day_hours:[],
            open: false, 
            hours_of_operation: "",
            time: new Date().toLocaleString(),
            hours: [],
            lookup: {
                0: "Monday  ",
                1: "Tuesday  ",
                2: "Wednesday  ",
                3: "Thursday  ",
                4: "Friday\t ",
                5: "Saturday  ",
                6: "Sunday   "
            },
            week_day:""
        }
    }
    async componentDidMount() {
        // this.updateWeekHours()
        await this.updateWeekHours()
        this.intervalID = setInterval(
            () => this.tick(),
            1000
          );
        console.log(this.state.day_hours.join("\n"))
        let mess = this.state.day_hours.join("\n")
        this.setState({hours_of_operation: mess})
        
    }
    
    tick() {
        let new_day = new Date()
        this.setState({
          time: new_day.toLocaleString()

        });
        // console.log(this.state.time)
        this.setState({week_day: this.getDayOfWeek(new_day)})
        // console.log(this.state.week_day)
        let arr = this.state.hours.filter((arrItem) => arrItem[0].slice(0, this.state.week_day.length) == this.state.week_day)
        // console.log(arr)     
        let open = arr[1], close=arr[2]
        if (open == -1){
            this.setState({open: false})
        } else {
            if (close > open){
                this.setState({open: (open < new_day.getHours < close)})
            } else {

            }
        }
        // console.log(open)
        // console.log(close)
        // console.log(this.state.week_day == arr[0][0].splice(0,this.state.week_day.length))
        // if (open < time <  ){

        // }
      }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }
    componentWillUnmount() {
        clearInterval(this.intervalID);
      }
    async updateWeekHours(){
        this.props.vendor.hours.map(([open, close], index) => {
            // this.state.hours[this.state.lookup[index]].push(open)
            // this.state.hours[this.state.lookup[index]].push(close)
            
            this.state.hours.push([this.state.lookup[index],open,close])
            if (open === -1 || close === -1) {
                this.state.day_hours.push(this.state.lookup[index] + "\t\t" + "closed")
            } else {
                let first = (open > 12) ? (open-12).toString() + "pm" : open.toString()+"am"
                let second = (close > 12) ? (close-12).toString() + "pm" : close.toString()+"am"
                this.state.day_hours.push(this.state.lookup[index]+"\t\t"+first + " - " + second)
                
            }
        })
        
    }

    onVendorPress() {
        this.props.navigation.navigate("SingleVendorMenu", {
            vendor : this.props.vendor,
        }) 
    }

    
    
    render() {
        // Currently, just displaying vendor name from struct
        var vendorName = this.props.vendor.name
        // console.log("\n\n vendor hours: " + this.props.vendor.hours)
        console.log("SINGLE VENDOR")
        return (
            <TouchableHighlight onPress={this.onVendorPress}>
                <View>
                {/* <View style={css.flatlist.vendorView}> */}
                    <Text style={css.text.bigBodyTextCentered}>{vendorName}</Text>
                    {this.state.day_hours.map((x,idx) => <Text key={idx}>{x.replace(/\./g, ":")}</Text>)}{"\n\n\n"}
                    {/* <Text>{this.state.day_hours.join("\n")}</Text> */}
                {/* </View> */}
                </View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(SingleVendorButton)

