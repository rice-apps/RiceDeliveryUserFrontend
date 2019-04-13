import * as React from "react"
import { ScrollView, View, AsyncStorage, FlatList, SectionList, Linking} from "react-native"
import { ListItem, Text, Divider } from "react-native-elements"
import SecondaryButton from "../../../components/secondary-button"
import * as css from "../../style"
import CookieManager from "react-native-cookies" 
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../stores/root-store"
import { NavigationScreenProp } from "react-navigation";
import {material} from "react-native-typography"
export interface CreateAccountScreenProps {
  rootStore?: RootStore
  navigation: NavigationScreenProp<any, any>
}
@inject("rootStore")
@observer
export class FAQScreen extends React.Component<CreateAccountScreenProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    title: "Brought to you by",
                    description:"Rice Apps Team Hedwig (Johnny Cai, Justin Fan, Amy Huyen, Will Mundy, Will Su, Jamie Tan, and Jeffrey Wang)"
                    
                },
                {
                    title: "What payment methods do you accept?",
                    description: "We accept all credit cards. Cash and check are not accepted.",
                },
                {
                    title: "What if I need to cancel my order?",
                    description: "You can cancel your order and receive your refund while the order status is “Pending.” Once the order status is changed to “On the way,” you can still cancel but will not receive a refund.",
                },
                {
                    title: "Do you have coupons or promotional codes?",
                    description: "Our app does not support coupon or promotional codes. If you received any flyers at our opening events, you should be able to redeem these in person with the vendor."
                
                },
                {
                    title: "Do I need to tip my delivery person?",
                    description: "No.",
                },
                {
                    title: "Is there a minimum amount of boba that I need to order?",
                    description: "There is no minimum amount required.",
                },
                {
                    title: "What is your refund policy?",
                    description: "You will receive your refund if you cancel your order while the order status is “Pending.” You will not receive a refund if the order status is “On the way.” We submit refund requests to your bank immediately, but depending on your bank, refunds take approximately 5-10 business days to process.",
                }
            ]
        }
    }

    renderItem = ({item}) => (
        <View style={{padding: 10}}>
            <View style={{paddingBottom: 10}}>
                <Text style={material.headlineWhite}>
                    {item.title}
                </Text>
             </View>
             <Divider ></Divider>
             <View style={{paddingTop: 10}}>
                <Text style={material.body2White}>
                    {item.description}
                </Text>
             </View>

        </View>
    )

    contactData = (index) => (
        <View style={{padding: 10}} key={index}>

            <View style={{paddingBottom: 10}}>
                <Text style={material.headlineWhite}>
                    Who can I contact if I have a problem? 
                </Text>
            </View>
            <Divider ></Divider>
            <View style={{paddingTop: 10}}>
                <Text style={material.body2White}>
                    For any issues with your delivery, please reach out to East-West at info@eastwesttearice.com or 832-649-0626.  
                    For any issues with the app itself, please submit any issues to the following Google Form: {" "} 
                    <Text 
                    style={[material.subheading, {color: "orange"}]}
                    onPress={() => Linking.openURL('https://forms.gle/bbr3GtbuFg4PdGE19')}
                    >
                        https://forms.gle/bbr3GtbuFg4PdGE19

                    </Text>
                </Text>
            </View>
        </View>
    )
    render() {
        console.log(this.state.data)
        return (
            <View style = {[css.screen.paddedScreen, {backgroundColor: "black"}]}>
                <SectionList
                    data={this.state.data}
                    renderItem={this.contactData}
                    keyExtractor={(item, index) => index.toString()}
                    sections={[
                        {title: "info", data: this.state.data, renderItem: this.renderItem},
                        {title: "contact", data: ["placeholder"]},

                    ]}
                    
                 />

            </View>
        )
    }
}
