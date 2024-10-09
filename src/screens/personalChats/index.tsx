import React, { useCallback, useEffect, useState } from "react";
import {View,Text,TouchableOpacity,Image,ImageBackground} from "react-native";
import { GiftedChat, IMessage, InputToolbar, MessageText } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icons } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import MoreItemsModal from "../../components/MoreItemsModal";
import ReactionModal from "../../components/ReactionModal";
import CustomModal from "../../components/CustomModal";
import { colors } from "../../themes";
import { getInitials } from "../../utils/getInitials";

interface User {
  _id: number;
  name: string;
  profileImg?: string;
  displayName?: string;
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

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.containerstyle}
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
  const [messageIdToDelete, setMessageIdToDelete] = useState<number | null>(null);
  const [text,setText]=useState('')
  const chatId = user._id;
  //console.log(chatId);
  const navigation = useNavigation();
  const [personchat, setPersonChat] = useState([]);

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    const isUserMessage = currentMessage.user._id === 1;
    const messageTime = new Date(currentMessage.createdAt).toLocaleTimeString([],{ hour: "2-digit",minute: "2-digit",});
    return (
      <>
        <TouchableOpacity
          onLongPress={() => onLongPress(null, currentMessage)}
          style={{
            alignSelf: isUserMessage ? "flex-end" : "flex-start",
            backgroundColor: isUserMessage ? colors.darkblue : colors.Gray,
            borderRadius: 10,
            maxWidth: "80%",
            marginHorizontal: 15,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            position: "relative",
          }}
        >
          <Text style={{color: isUserMessage ? colors.white : colors.black,fontSize: 16}}>
            {currentMessage.text}
          </Text>
          {currentMessage.reaction && (
            <View
              style={{
                top: -14,
                position: "absolute",
                left: isUserMessage ? -16 : 120,
                padding: 5,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: isUserMessage ?colors.white : colors.black }}>
                {currentMessage.reaction}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 10,
            color: colors.black,
            textAlign: isUserMessage ? "right" : "left",
            left: 10,
          }}
        >
          {messageTime}
        </Text>
      </>
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeReactionModal = () => {
    setReactionModal(false);
  };

  const handleEmojiPress = async (emoji: string) => {
    if (messageIdToDelete) {
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => {
          if (msg._id === messageIdToDelete) {
            return {
              ...msg,
              reaction: msg.reaction === emoji ? null : emoji,
            };
          }
          return msg;
        });
      //  console.log("ooooooooo", updatedMessages);
        AsyncStorage.setItem(`messages_${chatId}`,JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    }
    closeReactionModal();
  };

  console.log(messages);

  const openCustomModal = () => {
    setCustomModalVisible(true);
    closeReactionModal();
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity style={{ alignSelf: "center" }}>
        <Image source={Icons.addIcon} style={styles.addIcon} />
      </TouchableOpacity>
    );
  }, []);

  const onLongPress = (context: any, message: any) => {
    setMessageIdToDelete(message._id);
    setReactionModal(true);
    setPersonChat(message);
  };
  

  const handleDeletes = async (id: number) => {
   // console.log("id is", id);
    const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
    const messagesArray = storedMessages ? JSON.parse(storedMessages) : [];
    if (Array.isArray(messagesArray)) {
      const updatedMessagesArray = messagesArray.filter(
        (message) => message._id !== id
      );
      await AsyncStorage.setItem(`messages_${chatId}`,JSON.stringify(updatedMessagesArray));
      setMessages(updatedMessagesArray);
      setToggle(!toggle);
    } else {
      console.error("Parsed messages is not an array:", messagesArray);
    }
  };
  const closeCustomModal = () => {
    setCustomModalVisible(false);
  };

  const renderSend = (props: any) => {
    return (
      <TouchableOpacity
        style={styles.chatInput}
        onPress={() => {
          const messageText = props?.text;
          if (messageText && messageText.trim()) {
            onSend();
            props?.onSend([
              {
                _id: Math.random(),
                text: messageText,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                  avatar: "https://placeimg.com/140/140/any",
                },
              },
            ]);
          }
          
        }
       
      }
      >
        <Image  source={Icons.telegram} style={styles.sendIcon}/>
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
            text: "Hello What's up?",
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
      AsyncStorage.setItem(`messages_${chatId}`,JSON.stringify(updatedMessages)
      );
      // Pass the last message to storeChatUser
      if (newMessages.length > 0) {
        const lastMessage = newMessages[newMessages.length - 1];
        storeChatUser(user, lastMessage);
      }
      return updatedMessages;
    });
    setText('');
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


  const handlePress = () => {
    setModalVisible(true);
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTitle}>
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
              <Text style={styles.profileText}>
                {getInitials(user.name || user.displayName)}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>{user.name || user.displayName}</Text>
            <Text style={styles.text1}>Clocked In</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.cartIcon}>
            <Image source={Icons.moreIcon} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ImageBackground style={styles.chatBackground}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          placeholder="Message..."
          user={{
            _id: 1,
            name: "Current User",
          }}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          renderActions={renderActions}
          renderSend={renderSend}
          onLongPress={onLongPress}
          renderMessage={renderMessage}
          onInputTextChanged={setText} 
          text={text}
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
        imageSource={Icons.deleteModalIcon}
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
