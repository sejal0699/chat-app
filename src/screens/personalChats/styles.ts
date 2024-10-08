import { StyleSheet } from "react-native";
import { colors } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    marginTop: 20,
    right: 10,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    height: "15%",
  },
  profileText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconImage: {
    width: 35,
    height: 35,
    marginLeft: 20,
  },
  text: {
    marginTop: 15,
    right: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 12,
    top: 2,
    right: 10,
  },
  backBox: {
    backgroundColor: "#FFFFFF",
    width: 48,
    margin: 12,
    borderRadius: 10,
    height: 48,
  },
  backButton: {
    margin: 16,
    position: "absolute",
    top: 0,
    left: 0,
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 22,
    height: 15,
    bottom: 12,
    right: 20,
  },
  cartIcon: {
    marginTop: 20,
    marginRight: 20,
  },
  addIcon: {
    height: 20,
    width: 20,
  },
  sendIcon: {
    height: 40,
    width: 40,
    marginLeft: 10,
  },
  headerTitle: {
    flexDirection: "row",
    gap: 10,
  },
  chatBackground: {
    flex: 1,
    backgroundColor: "#E6EDF3",
    marginBottom: 40,
  },
  chatInput: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  icon:{
     alignSelf: "center" 
  }
});
