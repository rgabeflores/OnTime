'use strict'
import React from 'react-native';
let {StyleSheet} = React;
const constants = {
    actionColor:'#ffff'
}
//create style sheets
module.exports = StyleSheet.create({
    navbar: {
        alignItems: "center",
        borderWidth: 1,
        justifyContent: "center",
        height: 44,
        backgroundColor: "lightblue",
        borderBottomColor: "#eee",
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    navbarTitle:{
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
        backgroundColor: "lightblue"
    },
    toolbar:{
        backgroundColor: '#fff',
        height: 22,
    },
    li: {
<<<<<<< HEAD
<<<<<<< HEAD
        borderWidth: 5,
        backgroundColor: "white",
=======
        alignItems: "center",
        borderWidth: 2,
        backgroundColor: "grey",
>>>>>>> Added styles
=======
        borderWidth: 5,
        backgroundColor: "white",
>>>>>>> Adjusted the Task display to include task name, hours and location
        justifyContent: "center",
        borderColor: "transparent",
        borderBottomColor: "#eee"
    },
    liText:{

    }
});
