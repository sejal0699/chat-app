import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import styles from './styles';
import { Icons } from '../../assets';
import EmptyScreen from '../../components/EmptyScreen';
import { useNavigation } from '@react-navigation/native'; 
import { ScreenNames } from '../../navigation/screenNames';

interface ChatUser {
  _id: number; 
  name: string;
  avatar?: string; 
  lastMessage?: string;
  timestamp?: string; 
}


const Chat = () => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    const loadChatUsers = async () => {
      const storedChatUsers = await AsyncStorage.getItem('chatUsers');

      if (storedChatUsers) {
        const parsedUsers = JSON.parse(storedChatUsers);
        setChatUsers(parsedUsers);
      }
    };

    loadChatUsers();
  }, [chatUsers]);

  const clearChatUsers = async () => {
    await AsyncStorage.clear();
    setChatUsers([]); 
  };

  // Function to get initials from the name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(word => word.charAt(0).toUpperCase()).join('');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchBox}>
        <Image source={Icons.search} />
        <Text style={styles.searchText}>Search Messages...</Text>
      </View>
      <Button title="Clear Chat Users" onPress={clearChatUsers} />
      <View style={styles.box}>
        {chatUsers.length === 0 ? (
          <EmptyScreen />
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={chatUsers}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ScreenNames.ChatScreen, { user: item })
                  }
                >
                  <View style={styles.box1}>
                    <View style={styles.profilePictureContainer}>
                      <View style={styles.profilePicture}>
                        <Text style={styles.profileText}>
                          {getInitials(item.name)} 
                        </Text>
                      </View>
                    </View>

                    <View style={styles.userInfo}>
    <Text style={styles.text}>{item.name}</Text>
    {item.lastMessage && (
      <Text style={styles.lastMessageText}>
        {item.lastMessage} 
      </Text>
    )}
  </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Chat;
