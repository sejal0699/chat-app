import { StyleSheet } from "react-native";
import { colors } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E6EDF3',
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
    borderBottomColor: '#ccc',
  },
  chatUserName: {
    fontSize: 16,
  },
  box1:{
    flexDirection:'row',
    gap:10,
    margin:10,
    padding:10,
borderBottomWidth:1,
        borderBottomColor:'#CCCCCC'
  
  },
  lastMessageText: {
    fontSize: 12,
    color: 'gray', 
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
    width: 50, 
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#007AFF',
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden', 
  },
  profileText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text:{
    fontWeight:'bold',
    alignSelf:'flex-start',
    fontSize:20,
    marginBottom:10,
  
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
