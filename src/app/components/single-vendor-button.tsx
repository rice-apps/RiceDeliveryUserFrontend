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
            hours: [[], [], [], [], [], [], []],
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

    check_open(new_day){
        let day_idx = new_day.getDay()
        if (day_idx == 0) {
            day_idx = 7
        } else {
            day_idx -= 1
        }
        let checker = false
        this.state.hours[day_idx].map(x => {
            
            if (x[0] < new_day.getHours() < x[1]){
                console.log(x[0], day_idx, x[1])
                checker = true
            }
        })
        this.setState({open: checker}) 
    }

    async componentDidMount() {
        // this.updateWeekHours()
        await this.updateWeekHours()
        this.intervalID = setInterval(
            () => this.tick(),
            1000*60
          );
        console.log(this.state.day_hours.join("\n"))
        let mess = this.state.day_hours.join("\n")
        this.setState({hours_of_operation: mess})
        this.check_open(new Date())

        
    }
    
    returnClosed(){
        return (<Text key="closed text" style={{color:"red"}}>Closed</Text>)
    }

    returnOpen(){
        return (<Text key="closed text" style={{color:"green"}}>Open</Text>)
    }

    tick() {
        let new_day = new Date()
        this.setState({
          time: new_day.toLocaleString()
        });
        // console.log(this.state.time)
        this.setState({week_day: this.getDayOfWeek(new_day)})
        this.check_open(new Date())

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
            if (open > close) {
                this.state.hours[index].push([open,24])
                if (index === 6){
                    this.state.hours[0].push([0, close])
                } else {
                    this.state.hours[index+1].push([0, close])
                }
            } else {
                this.state.hours[index].push([open, close])
            }

            // this.state.hours.push([this.state.lookup[index],open,close])
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
        console.log("\n\n vendor hours: " + this.props.vendor.hours)

        return (
            <TouchableHighlight onPress={(this.state.open) ? this.onVendorPress: () => {}}>
                {/* <View> */}
                <View style={css.flatlist.vendorView}>
                <View style={{
                    flex : 1,
                    flexDirection : "row",
                    justifyContent : "space-between"
                }}>
                    <Text style={css.text.bigBodyText}>{vendorName}</Text>
                    <View style={{
                        backgroundColor : this.state.open ? "green" : "red",
                        borderRadius : 7,
                        padding : 4
                    }}>
                    <Text style={css.text.bigBodyText}>
                        {(this.state.open == true) ? "Open": this.returnClosed()}
                    </Text>
                    </View>
                </View>
                    {this.state.day_hours.map((x,idx) => <Text key={idx}>{x.replace(/\./g, ":")}</Text>)}{"\n\n\n"}
                    
                    {/* <Text>{this.state.day_hours.join("\n")}</Text> */}
                </View>
                {/* </View> */}
            </TouchableHighlight>
        )
    }
}

export default withNavigation(SingleVendorButton)

