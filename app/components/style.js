'use strict'
import {
    StyleSheet
} from 'react-native';

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
        borderWidth: 5,
        backgroundColor: "white",
        alignItems: "center",
        borderWidth: 2,
        backgroundColor: "grey",
        borderWidth: 5,
        backgroundColor: "white",
        borderWidth: 5,
        backgroundColor: "white",
        justifyContent: "center",
        borderColor: "transparent",
        borderBottomColor: "#eee"
    },
    liText:{

    }
});
