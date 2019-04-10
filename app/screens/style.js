"use strict";
import { StyleSheet, Platform } from "react-native";

const constants = {
  actionColor: "#ffff"
};

//create style sheets
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  containerCompressed: {
    flex: 1,
    marginBottom: "45%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInputContainer: {
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    width: "100%",
    minWidth: "75%"
  },textInputContainerTask: {
    alignSelf: "center",
    borderColor: "lightblue",
    borderWidth: 0.5,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    width: "70%",
    minWidth: "75%"
  },
  Title: {
    color: "lightblue",
    fontSize: 50
  },
  image: {
    width: 150,
    height: 150
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 30
  },
  buttonText: {
    padding: 20,
    color: "white"
  },
  settingsButton: {
    width: "white"
  },
  buttonContainer: {
    margin: 5,
    minWidth: "50%"
  },
  linkText: {
    padding: 5,
    minWidth: "50%",
    color: "lightblue"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  calendar: {
    flex: 1
  },
  // For TaskScreen
  taskContainer: {
    textAlign: "left",
    borderBottomWidth: 5,
    borderBottomColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // For HomeScreen
  calendarTaskContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: "white"
  },
  calendarTaskTitle:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#00adf5"
  },
  calendarTaskDescription:{
    color: "lightgrey"
  },
  calendarTaskButtonContainer: {
    margin: 5,
    minWidth: "25%"
  },
  calendarTaskButton: {
    alignItems: "center",
    backgroundColor: "#00adf5",
    borderRadius: 5
  },
  calendarTaskButtonText: {
    color: "white",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: "200"
  },
});
