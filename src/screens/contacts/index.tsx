import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { Icons, Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Contacts from "react-native-contacts";
import contactsData from "../../data.json";
import { ScreenNames } from "../../navigation/screenNames";
import { getInitials } from "../../utils/getInitials";
import { CONTACT_STATUS } from "../../utils/enum";
import firestore from "@react-native-firebase/firestore"
interface Contact {
  recordID?: string;
  displayName?: string;
  name?: string;
  image?: string;
  [key: string]: any;
}

const Contact = () => {
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(()=>{
    const usersFromDatabase=async()=>{
      const users = await firestore().collection('users').get();
      console.log(users);
      // const user = await firestore().collection(users').doc('ABC').get();
    }
    usersFromDatabase();
      },[])
  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const permission = await Contacts.requestPermission();
  //     if (permission === CONTACT_STATUS.AUTHORIZED) {
  //       const fetchedContacts = await Contacts.getAll();
  //       const normalizedContacts = fetchedContacts.map((contact) => ({
  //         recordID: contact.recordID,
  //         displayName: `${contact.givenName} ${contact.familyName}`.trim(),
  //         image: contact.hasThumbnail ? contact.thumbnailPath : null,
  //       }));

  //       const mergedContacts: Contact[] = [
  //         ...normalizedContacts,
  //         ...contactsData,
  //       ];

  //       // Sort contacts in ascending order by displayName
  //       const sortedContacts = mergedContacts.sort((a, b) => {
  //         const nameA = a.displayName?.toLowerCase() || "";
  //         const nameB = b.displayName?.toLowerCase() || "";
  //         return nameA.localeCompare(nameB);
  //       });

  //       setAllContacts(sortedContacts);
  //       saveContactsToFirestore(sortedContacts);
  //     } else {
  //       console.log("Permission to access contacts was denied.");
  //     }
  //   };

  //   fetchContacts();
  // }, []);



  const saveContactsToFirestore = async (contacts) => {
    const allContacts = firestore().collection('contacts');
    console.log('allContacts',allContacts);
    
    const batch = firestore().batch();
    console.log('batch stored',batch);
    console.log('contacts',contacts);
    
    contacts.forEach((contact) => {
      const contactRef = allContacts.doc(contact.recordID || contact.displayName);
      console.log('contactRef',contactRef);
      
      batch.set(contactRef, contact);
    });

    await batch.commit();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    if (query) {
      const filtered = allContacts.filter((contact) => {
        const contactName = contact.displayName || contact.name || "";
        return contactName.toLowerCase().startsWith(query.toLowerCase());
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setFilteredContacts([]);
    setHasSearched(false);
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenNames.ChatScreen, { user: item })
      }
    >
      <View style={styles.box1}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileText}>
              {item.image ? (
                <Image source={{ uri: item.image }} />
              ) : (
                getInitials(item.displayName || item.name)
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.text}>{item.displayName || item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <View style={styles.backBox}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={Icons.backArrow} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Here..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {hasSearched ? (
            <TouchableOpacity onPress={handleClear}>
              <Image source={Icons.cross} style={styles.crossIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.listContainer}>
      <FlatList
        ListEmptyComponent={
          <View style={styles.box}>
            <Image source={Images.searchImage} style={styles.image} />
            <Text style={styles.text}>No Results Found</Text>
          </View>
        }
        data={hasSearched ? filteredContacts : allContacts}
        keyExtractor={(item, index) =>
          item.recordID ? item.recordID : `contact-${index}`
        }
        renderItem={renderItem}
      />
</View>
      {hasSearched && filteredContacts.length === 0 && (
        //   <View style={styles.box}>
        //   <Image source={Images.searchImage} style={styles.image} />
        //   <Text style={styles.text}>No Results Found</Text>
        // </View>
        <></>
      )}
    </SafeAreaView>
  );
};

export default Contact;
