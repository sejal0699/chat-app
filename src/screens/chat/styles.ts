import { StyleSheet } from "react-native";
import { colors } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.lightBlue,
  },
  searchBox: {
    padding: 15,
    backgroundColor: colors.white,
    flexDirection: "row",
    margin: 15,
    borderRadius: 15,
    gap: 10,
  },
  searchText: {
    color: colors.midGrey,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  chatUser: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  chatUserName: {
    fontSize: 16,
  },
  box1:{
    flexDirection:'row',
    gap:8,
    margin:8,
    padding:8,
borderBottomWidth:0.2,
borderBottomColor:colors.lightGrey,

  
  },
  lastMessageText: {
    fontSize: 12,
    color: 'gray',
    top:5 
  },
  userInfo: {
    marginLeft: 10, 
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingTop: 50

},
profilePictureContainer: {
    borderRadius: 70,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,


},
profilePicture: {
    width: 45, 
    height: 45,
    borderRadius: 25, 
    backgroundColor: '#007AFF',
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden', 
  },
  profileText: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text:{
    fontWeight:'semibold',
    alignSelf:'flex-start',
    fontSize:16,
    marginBottom:8,
    top:5

  
      },
      listContainer: {
        padding: 1,
        alignContent: 'space-between',
        backgroundColor: '#F8F9F9',
        margin: 14,
        borderRadius: 10,
        width:'90%'
        
     
    
      },
});
