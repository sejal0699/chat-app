import { StyleSheet } from "react-native";
import { colors } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDF3",
  },
  backBox: {
    backgroundColor: "#FFFFFF",
    width: "15%",
    marginRight: 10,

    borderRadius: 12,
  },
  backButton: {},
  backIcon: {
    width: 23,
    height: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  searchBox: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: "80%",
    paddingVertical: 20,
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
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  image: {},
  box: {
    alignItems: "center",
    justifyContent: "center",
    

  },
  box1: {
    flexDirection: "row",
    gap: 10,
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
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
