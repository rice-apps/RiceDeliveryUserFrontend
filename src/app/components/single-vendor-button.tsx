import * as React from "react"
import { Text, View, StyleSheet, TouchableHighlight } from "react-native"
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
    async componentDidMount() {
        // this.updateWeekHours()
        await this.updateWeekHours()
        this.props.rootStore.vendorStore.setHourTransformed(this.state.hours)
        console.log("\n\n\n\n\n we are setting this after we await \n\n\n\n")
        this.props.rootStore.vendorStore.check_open(new Date())
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
    async updateWeekHours(){
        this.props.vendor.hours.map(([open, close], index) => {
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
        console.log('\n\n\n\n\n UPDATE FINISHED \n\n\n\n\n\n')
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
            <TouchableHighlight onPress={(this.props.rootStore.vendorStore.open) ? this.onVendorPress: () => {}}>
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
                    
                    {/* <Text>{this.state.day_hours.join("\n")}</Text> */}
                </View>
                {/* </View> */}
            </TouchableHighlight>
        )
    }
}

export default withNavigation(SingleVendorButton)

