import * as React from "react"
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native"
import { withNavigation } from "react-navigation"
import * as css from "../screens/style"
import { RootStore } from "../../../stores/root-store";
import { inject, observer } from "mobx-react"


// Should we always define the input props/state for components instead of <any, any>???
@inject("rootStore")
@observer
class SingleVendorButton extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log("THIS IS THE PROPS: " + props)
        this.onVendorPress = this.onVendorPress.bind(this)
        this.state = {
            day_hours:[],
            open: false, 
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
        }
    }
    async componentWillMount() {
        // this.updateWeekHours()
        
        await this.updateWeekHours().then(x => {
            this.props.rootStore.vendorStore.setHourTransformed(this.state.hours)
            this.props.rootStore.vendorStore.check_open(new Date())
        })

        console.log("this is after update: " + this.state.hours.join("\n"))
        this.intervalID = setInterval(
            () => this.tick(),
            1000*60
          );

        
    }
    
    returnClosed(){
        return (<Text key="closed text" style={{color:"white"}}>Closed</Text>)
    }

    returnOpen(){
        return (<Text key="open text" style={{color:"white"}}>Open</Text>)
    }

    tick() {
        let new_day = new Date()
        // console.log(this.state.time)
        this.props.rootStore.vendorStore.check_open(new Date())
        console.log("calling from TCIK \n\n\n\n")
        this.props.rootStore.vendorStore.setHourTransformed(this.state.hours)
      }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }

    componentWillUnmount() {
        clearInterval(this.intervalID);
      }


    check_hours = async () => {
            // get the hours 
        // console.log(this.props.rootStore)
        await this.props.rootStore.vendorStore.getHours()
        console.log("finished grabbing hours from backend")

        this.setState({day_hours: []})
        // transform the hours array 
        await this.updateWeekHours()
        console.log("finish transforming the hours arr")
        // check if our current time is within opening hours
        await this.props.rootStore.vendorStore.check_open(new Date())
        console.log('finishing checking open status: ' + this.props.rootStore.vendorStore.open)
        if (this.props.rootStore.vendorStore.open){
            this.props.navigation.navigate("SingleVendorMenu", {
                vendor : this.props.vendor,
            }) 
        } else {
            Alert.alert("Vendor is currently closed! Please try again!")
        }
    }

    transform24(hour){
        let temp = Math.floor(hour)
        if (temp > 11){
            if (temp == 24){
                return (hour-12).toFixed(2).toString() + "am"
            } else if (temp === 12){
                return (hour).toString() + "pm"
            } else {
                return (hour-12).toFixed(2).toString() + "pm"
            }
        } else {
            return hour.toString()+"am"
        }
        
    }

    async updateWeekHours(){
        let arr = [[], [], [], [], [], [], []]
        this.props.rootStore.vendorStore.vendors[0].hours.map(([open, close], index) => {
            open = Math.round(open * 100) / 100
            close = Math.round(close * 100) / 100
            console.log(open, close)
            if (open > close) {
                arr[index].push([open,24])
                if (index === 6){
                    arr[0].push([0, close])
                } else {
                    arr[index+1].push([0, close])
                }
            } else {
                arr[index].push([open, close])
            }
            // this.state.hours.push([this.state.lookup[index],open,close])
            if (open === -1 || close === -1) {
                this.state.day_hours.push(this.state.lookup[index] + "\t\t" + "closed")
            } else {
                // let first = (open > 11) ? (open-12).toFixed(2).toString() + "pm" : open.toString()+"am"
                let first = this.transform24(open)
                // let second = (close > 11) ? (close-12).toFixed(2).toString() + "pm" : close.toString()+"am"
                let second = this.transform24(close)
                this.state.day_hours.push(this.state.lookup[index]+"\t\t"+first + " - " + second)
            }
        })
        this.props.rootStore.vendorStore.setHourTransformed(arr)
        this.setState({hours: arr})
        console.log('\n\n\n\n\n UPDATE FINISHED \n\n\n\n\n\n')
        // console.log(this.state.day_hours.join("\n"))
    }

    onVendorPress() {
        this.props.navigation.navigate("SingleVendorMenu", {
            vendor : this.props.vendor,
        }) 

    }

    
    
    render() {
        // Currently, just displaying vendor name from struct
        var vendorName = this.props.vendor.name
        return (
            <TouchableHighlight onPress={this.check_hours}>
                {/* <View> */}
                <View style={css.flatlist.vendorView}>
                <View style={{
                    flex : 1,
                    flexDirection : "row",
                    justifyContent : "space-between"
                }}>
                    <Text style={css.text.bigBodyText}>{vendorName}</Text>
                    <View style={{
                        backgroundColor : this.props.rootStore.vendorStore.open ? "green" : "red",
                        borderRadius : 7,
                        padding : 4
                    }}>
                    <Text style={css.text.bigBodyText}>
                        {(this.props.rootStore.vendorStore.open == true) ? this.returnOpen(): this.returnClosed()}
                    </Text>
                    </View>
                </View>
                    {this.state.day_hours.map((x,idx) => <Text key={idx}>{x.replace(/\./g, ":")}</Text>)}{"\n\n\n"}
                    {/* {console.log(this.state.day_hours.join("\n"))} */}
                    {/* <Text>{this.state.day_hours.join("\n")}</Text> */}
                </View>
                {/* </View> */}
            </TouchableHighlight>
        )
    }
}

export default withNavigation(SingleVendorButton)

