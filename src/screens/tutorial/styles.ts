import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');
export default StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
    },
    screen: {
      width,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom:20
    },
    image: {
      width: 350,
      height: 350,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 25,
      position: 'absolute',
      bottom: 100,
     alignSelf:'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
      marginBottom:40
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ccc',
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#007bff',
    },
 
  });
  