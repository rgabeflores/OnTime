"use strict";
import { StyleSheet, Platform } from "react-native";

const constants = {
  actionColor: "#ffff"
};


const MAIN_COLOR = "#00adf5";
const MAIN_TEXT_COLOR = "black";
const SECOND_TEXT_COLOR = "lightgrey";

const DEFAULT_SHADOW_SETTINGS = {
    shadowOffset: { width: 1, height: 1,  },
    shadowRadius: 3,
    shadowColor: SECOND_TEXT_COLOR,
    shadowOpacity: 0.5,
};

const DEFAULT_TEXT_SHADOW_SETTINGS = {
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
}

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
    borderColor: SECOND_TEXT_COLOR,
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 5,
    width: "100%",
    minWidth: "75%",
    ...DEFAULT_SHADOW_SETTINGS
  },
  textInputContainerTask: {
    alignSelf: "center",
    borderColor: SECOND_TEXT_COLOR,
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    margin: 5,
    width: "70%",
    minWidth: "75%"
  },
  Title: {
    color: SECOND_TEXT_COLOR,
    fontSize: 64,
    textAlign: "center"
    // ...DEFAULT_TEXT_SHADOW_SETTINGS
  },
  smallTitle: {
    color: MAIN_TEXT_COLOR,
    fontSize: 48,
    textAlign: "center"
  },
  image: {
    width: 150,
    height: 150
  },
  button: {
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    borderRadius: 5,
    ...DEFAULT_SHADOW_SETTINGS
  },
  buttonText: {
    padding: 10,
    color: "white"
  },
  settingsButton: {
    width: "white"
  },
  buttonContainer: {
    margin: 5,
    minWidth: "50%",
    ...DEFAULT_SHADOW_SETTINGS
  },
  linkText: {
    padding: 5,
    minWidth: "50%",
    color: MAIN_COLOR,
    textAlign: "center",
    textDecorationLine: 'underline',
    fontStyle: "italic",
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
        shadowColor: MAIN_TEXT_COLOR,
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
  calendarEmptyTaskContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  calendarEmptyTask:{
    height: "95%",
    // padding: 10,
    marginTop: 17,
    marginRight:10,
    backgroundColor: "#F1F1F1",
    width: "100%"
  },
  calendarTaskContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: "white",
    ...DEFAULT_SHADOW_SETTINGS,
  },
  calendarTaskTitle:{
    fontSize: 16,
    fontWeight: "bold",
    color: MAIN_COLOR
  },
  calendarTaskDescription:{
    color: SECOND_TEXT_COLOR
  },
  calendarTaskButtonContainer: {
    margin: 5,
    minWidth: "25%"
  },
  calendarTaskButton: {
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    borderRadius: 5
  },
  calendarTaskButtonText: {
    color: "white",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: "200"
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  modalButtonContainer: {
    margin: 5,
    minWidth: "50%"
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 10
  },
  modalButtonText: {
    fontSize: 24,
    fontWeight: "200",
    padding: 10,
    color: MAIN_COLOR
  },
  statePicker: {
    alignSelf: "center",
    borderColor: MAIN_TEXT_COLOR,
    borderWidth: 0.5,
    borderRadius: 30,
    padding: 15,
    margin: 5,
    height: "auto",
    width: "20%",
    height: 25
  },
  // Timer Styles
  stopwatchContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: SECOND_TEXT_COLOR,
    borderRadius: 2,
    width: "85%",
    minWidth: "75%",
  },
  stopwatchText: {
    textAlign: "center",
    fontSize: 32,
    color: MAIN_TEXT_COLOR,
  }
});
