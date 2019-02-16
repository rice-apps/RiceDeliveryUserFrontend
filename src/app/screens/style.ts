import { StyleSheet } from "react-native";
import { color } from "../../theme";

//Use this site to look for RGB colors.
// https://www.w3schools.com/colors/colors_rgb.asp


const GRAY = "#696969";
const LIGHT_GRAY = "#DCDCDC"
const FONT_FAMILY = "Verdana"

//SCREENS
export const screen = StyleSheet.create({
    defaultScreen: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: LIGHT_GRAY
    }, 
    paddedScreen: {
        flex: 1, 
        padding: 10,
        backgroundColor: LIGHT_GRAY
    }, 
    divider : {
        backgroundColor : color.storybookDarkBg,
        height : 1,
    },
    singleOrderDisplay : {
        width : "100%",
        textAlign : "left",
        color: 'black',
        flex : 1,
        paddingTop : 20,
        paddingBottom : 20,
        paddingLeft : 10,
        paddingRight : 10,
    },
})

//TEXT
export const text = StyleSheet.create({
    logo: {
        fontSize: 30,
        fontFamily: FONT_FAMILY,
        color: GRAY,
        paddingBottom: 180
    },
    regularText: {
        fontSize: 15,
        fontFamily: FONT_FAMILY,
        color: GRAY,
    },
    headerText: {
        color: color.storybookTextColor,
        fontWeight: '800',
        fontSize: 40,
      },
    bodyText: {
        fontSize: 20,
        color: color.storybookTextColor,
        textAlign: "left"
    },
    bigBodyText: {
        fontSize: 26,
        color: color.storybookTextColor,
        textAlign: "left"
    },
    smallText : {
        fontSize : 15,
    },
    textInput: {
        margin: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    itemText : {
        marginLeft : 10,
        fontSize: 15,
        paddingTop : 5,
        paddingBottom : 5,
      },
});

//FLATLIST
export const flatlist = StyleSheet.create({
      itemText : {
        marginLeft : 10,
        fontSize: 15,
        paddingTop : 5,
        paddingBottom : 5,
      },
      container: {
        padding:10, 
        flex: 1,
        width : "100%",
      },
      vendorView: {
        backgroundColor: 'white',
        // flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 70,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#fff'    
      },
});

//TOUCHABLEOPACITY
export const touchableopacity = StyleSheet.create({
    timescroller: {
        height: 40, 
        width: 300, 
        padding: 4, 
        borderColor: 'gray', 
        borderWidth: 0
    }

});

//DATEPICKERIOS
export const datepickerios = StyleSheet.create({
    timescroller : { 
        height: 160, 
        alignContent: "center"
    }
});


//IMAGE
export const image = StyleSheet.create({
    logo : {
        width: 45, 
        height: 45
    }
});