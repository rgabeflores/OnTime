'use strict'
let React = require('react-native');
let {StyleSheet} = React;
const constants = {
    actionColor:'#4cb433'
}
//create style sheets
module.exports = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        backgroundColor: 'white',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        flexDirection: 'row'
    },
    navbarTitle:{
        color: '#444',
        fontSize: 16,
        fontWeight: "500"
    },
    toolbar:{
        backgroundColor: '#fff',
        height: 22,
    }
});