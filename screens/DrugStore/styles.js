import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerTop: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    height: 57,
    marginBottom: 20,
  },
  containerTopSearch: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  containerTopSearchInput : {
    height: '100%',
    width: '75%',
    backgroundColor: Colors.white,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  maps: {
    flex: 1,
    backgroundColor: Colors.blue,
    width: '100%',
    borderRadius: 10,
    padding: 0,
    margin: 0
  },
  results: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerBottom : {
    // paddingBottom: 60, 
    // marginBottom: 20,
    height: '76%'
  },
  list: {
    backgroundColor: Colors.white,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 20,
  },
  flastListLeft : {
    width: '75%',
  },
  leftTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flastListRight : {
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  
});

export default styles;