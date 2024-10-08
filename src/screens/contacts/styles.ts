import { StyleSheet } from "react-native";
import { colors } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDF3",
  },
  backBox: {
    backgroundColor: "#FFFFFF",
    width: "12%",
    marginRight: 10,
    height:'95%',
    borderRadius: 10,
    top:2
  },
  backButton: {},
  backIcon: {
    width: 23,
    height: 15,
    alignSelf: "center",
    marginTop: 15,
  },
  searchBox: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: "80%",
    paddingVertical: 16,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchText: {
    color: colors.midGrey,
  },
  search: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },
  text: {
  
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'semibold'
  },
  image: {},
  box: {
    alignItems: "center",
    justifyContent: "center",
    

  },
  listContainer: {
    padding: 1,
    alignContent: 'space-between',
    backgroundColor: '#F8F9F9',
    margin: 20,
    borderRadius: 10,
    width:'90%'
  },
  box1: {
    flexDirection:'row',
    gap:8,
    margin:8,
    padding:8,
borderBottomWidth:0.2,
borderBottomColor:colors.lightGrey,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingTop: 50,
  },
  profilePictureContainer: {
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  crossIcon: {
    height: 12,
    width: 12,
    right: 12,
    top: 2,
  },
});
