import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  maps: {
    flex: 1,
  },
  containerBack : {
  },
  goBack : {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFFBF',
    borderRadius: '50%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewBack : {
  },
  fixedCalloutContainer : {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  callout: {
    position: 'absolute',
    bottom: 0,
    width: 350,
  },
  bubble: {
    flexDirection: 'col',
    alignSelf: 'flex-start',
    width: '100%'
  },
  topSection : {
    borderColor: '#ccc',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    width: '100%',
    position: 'relative'
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  closeButton : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: '#496699',
    borderRadius: "100%"
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: 'bold',
  },
  addressSection : {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 30,
    padding: 15,
    width: '100%',
  },
  pharmacyName: {
    fontWeight: 'bold',
    color: "#4B4B4B",
    fontSize: 20,
    marginBottom: 10
  },
  shedule : {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    marginTop: 32,
    marginBottom: 16
  },
  phone : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 16
  },
  email : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 16
  },
  emailAddress : {
    textDecorationLine: 'underline'
  },
  website : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 16
  },
  websiteText : {
    textDecorationLine: 'underline'
  },
  userPosition : {
    position: "relative",
    zIndex: 1,
    backgroundColor: '#49669966',
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userPositionCircle : {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    position: "relative",
    zIndex: 2,
    backgroundColor: '#496699BF',
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
});

export default styles;