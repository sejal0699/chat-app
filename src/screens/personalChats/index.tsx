import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { GiftedChat, IMessage, InputToolbar } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icons } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes";
import SecureAccountModal from "../../components/ChatModel";
import MoreItemsModal from "../../components/MoreItemsModal";
import ReactionModal from "../../components/ReactionModal";
import CustomModal from "../../components/CustomModal";

interface User {
  _id: number;
  name: string;
  profileImg?: string;
}

interface RouteParams {
  user: User;
}

interface Props {
  route: {
    params: RouteParams;
  };
}
interface ChatUser {
  _id: number;
  name: string;
  profileImg?: string;
}

const customtInputToolbar = (props:any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        padding: 8,
        borderRadius: 20,
        // margin:10,
        // width:'90%'
      }}
    />
  );
};

const ChatScreen = ({ route }: Props) => {
  const { user } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reactionModal, setReactionModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isCustomModalVisible, setCustomModalVisible] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState<number | null>(
    null
  );
  const chatId = user._id;
  const [reactions, setReactions] = useState<{ [key: number]: string }>({});
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeReactionModal = () => {
    setReactionModal(false);
    // setCustomModalVisible(true);
  };

  const handleEmojiPress = (emoji: string) => {
    if (messageIdToDelete) {
      setReactions((prevReactions) => ({
        ...prevReactions,
        [messageIdToDelete]: emoji,
      }));
    }
    closeReactionModal();
  };
  const openCustomModal = () => {
    setCustomModalVisible(true);
    closeReactionModal();
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity style={{ alignSelf: "center" }}>
        <Image source={Icons.addIcon} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
    );
  }, []);

  const onLongPress = (context:any, message:any) => {
    setMessageIdToDelete(message._id); 
    setReactionModal(true);
  };

  const handleDeletes = async (id:number) => {
    console.log('id is',id);
    
    const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
    const messagesArray = storedMessages ? JSON.parse(storedMessages) : [];

    if (Array.isArray(messagesArray)) {
      const updatedMessagesArray = messagesArray.filter(
        (message) => message._id !== id
      );
      await AsyncStorage.setItem(
        `messages_${chatId}`,
        JSON.stringify(updatedMessagesArray)
      );
      setMessages(updatedMessagesArray); 
      setToggle(!toggle);
    } else {
      console.error("Parsed messages is not an array:", messagesArray);
    }
  };
  const closeCustomModal = () => {
    setCustomModalVisible(false);
  };

  const renderSend = (props:any) => {
    return (
      <TouchableOpacity
        style={{ alignSelf: "center", paddingHorizontal: 10 }}
        onPress={() => {
          onSend();
          props?.onSend([
            {
              _id: 1,
              text: props?.text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
          ]);
        }}
      >
        <Image
          source={Icons.telegram}
          style={{ height: 40, width: 40, marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            _id: 1,
            text: "Hello",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
        ]);
      }
    };

    loadMessages();
  }, [chatId, toggle]);

  const onSend = async (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, newMessages);
     AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));

  
      // Pass the last message to storeChatUser
      if (newMessages.length > 0) {
        const lastMessage = newMessages[newMessages.length - 1];
        storeChatUser(user, lastMessage); 
      }
  
      return updatedMessages;
    });
  };
  
  const storeChatUser = async (chatUser: User, lastMessage: IMessage) => {
    const storedChatUsers = await AsyncStorage.getItem("chatUsers");
    const chatUsers = storedChatUsers ? JSON.parse(storedChatUsers) : [];
    const userExists = chatUsers.find((u: ChatUser) => u._id === chatUser._id);
  
    if (!userExists) {
      chatUsers.push({
        _id: chatUser._id,
        name: chatUser.name,
        avatar: chatUser.profileImg,
        lastMessage: lastMessage.text, 
        timestamp: lastMessage.createdAt, 
      });
      await AsyncStorage.setItem("chatUsers", JSON.stringify(chatUsers));
      console.log(chatUsers);
    } else {
      // If the user already exists, update the last message and timestamp
      userExists.lastMessage = lastMessage.text;
      userExists.timestamp = lastMessage.createdAt;
      await AsyncStorage.setItem("chatUsers", JSON.stringify(chatUsers));
    }
  };
  
  // Function to get initials from the name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((word) => word.charAt(0).toUpperCase()).join("");
  };

  const handlePress = () => {
    setModalVisible(true);
  };
  

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.backBox}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={Icons.backArrow} style={styles.backIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileText}>{getInitials(user.name)}</Text>
            </View>
          </View>
          <View >
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text1}>Clocked In</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.cartIcon}>
            <Image source={Icons.moreIcon} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ImageBackground
        style={{ flex: 1, backgroundColor: '#E6EDF3', marginBottom: 40 }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          placeholder="Message..."
          user={{
            _id: 1,
            name: "Current User",
          }}
          // textInputStyle={{
          //   backgroundColor: "#FFFFFF",
          //   borderRadius: 10,
          //   paddingHorizontal: 10,
          // }}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          renderActions={renderActions}
          renderSend={renderSend}
          onLongPress={onLongPress}
         
        />
      </ImageBackground>

      <MoreItemsModal visible={modalVisible} closeModal={closeModal} />
      <ReactionModal
        visible={reactionModal}
        closeModal={closeReactionModal}
        onEmojiPress={handleEmojiPress}
        onDeletePress={openCustomModal}
      />
      <CustomModal
        visible={isCustomModalVisible}
        title="Delete Message?"
        description="Are you sure you want to delete this message?"
        imageSource={Icons.binIcon}
        buttonText="Yes, Delete"
        secondButtonText="Cancel"
        closeModal={() => setCustomModalVisible(false)}
        onButtonPress={() => {
          if (messageIdToDelete) {
            handleDeletes(messageIdToDelete);
          }
          closeCustomModal();
        }}
        onSecondButtonPress={() => {
          setCustomModalVisible(false);
        }}
      />
    </View>
  );
};

export default ChatScreen;
