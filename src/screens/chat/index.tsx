import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import styles from "./styles";
import { Icons } from "../../assets";
import EmptyScreen from "../../components/EmptyScreen";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../navigation/screenNames";

interface ChatUser {
  _id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  displayName?: string;
}

const Chat = () => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const navigation: any = useNavigation();

  const loadChatUsers = async () => {
    const storedChatUsers = await AsyncStorage.getItem("chatUsers");
    //console.log('gggg',storedChatUsers);

    if (storedChatUsers) {
      const parsedUsers = JSON.parse(storedChatUsers);
      setChatUsers(parsedUsers);
    } else {
      setChatUsers([]);
    }
  };

  useEffect(() => {
    loadChatUsers();
  }, [chatUsers]);

  //console.log('kkkk',chatUsers);

  const clearChatUsers = async () => {
    await AsyncStorage.clear();
    setChatUsers([]);
  };

  const getInitials = (name?: string, displayName?: string) => {
    const effectiveName = name || displayName;
    if (!effectiveName) return "";
    const nameArray = effectiveName.split(" ");
    const initials = nameArray.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchBox}>
        <Image source={Icons.search} />
        <Text style={styles.searchText}>Search Messages...</Text>
      </View>
      {/* <Button title="Clear Chat Users" onPress={clearChatUsers} /> */}
      <View style={styles.box}>
        {chatUsers.length === 0 ? (
          <EmptyScreen />
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={chatUsers}
              keyExtractor={(item) =>
                item._id ? item._id.toString() : "defaultKey"
              }
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
                          {getInitials(item.name, item.displayName)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.userInfo}>
                      <Text style={styles.text}>
                        {item.name || item.displayName}
                      </Text>
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
