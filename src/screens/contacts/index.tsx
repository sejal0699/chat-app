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
import Contacts from 'react-native-contacts';
import contactsData from "../../data.json";
import { ScreenNames } from "../../navigation/screenNames";

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
  useEffect(() => {
    const fetchContacts = async () => {
      const permission = await Contacts.requestPermission();
      if (permission === 'authorized') {
        const fetchedContacts = await Contacts.getAll();
        const normalizedContacts = fetchedContacts.map(contact => ({
          recordID: contact.recordID,
          displayName: `${contact.givenName} ${contact.familyName}`.trim(),
          image: contact.hasThumbnail ? contact.thumbnailPath : null,
        }));
        //@ts-ignore
        const mergedContacts : Contact[] = [...normalizedContacts, ...contactsData];
        console.log(mergedContacts);
        
        setAllContacts(mergedContacts);
      } else {
        console.log("Permission to access contacts was denied.");
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    if (query) {
      const filtered = allContacts.filter((contact) => {
        const contactName = contact.displayName || contact.name || '';
       // console.log('ppp',contact.displayName);
        
        return contactName.toLowerCase().startsWith(query.toLowerCase());
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]);
    }
  };
  const handleClear=()=>{
    setSearchQuery("")
  }

  const getInitials = (name?: string) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    const initials = nameArray.map((n) => n.charAt(0).toUpperCase()).join('');
    return initials;
  };

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
          <TouchableOpacity onPress={handleClear}>
          <Image source={Icons.cross} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {hasSearched ? (
        filteredContacts.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => (item.recordID ? item.recordID : item.id ? item.id.toString() : 'defaultKey')}
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
                          {item.image ? (
                            <Image source={{ uri: item.image }}  />
                          ) : (
                            getInitials(item.displayName || item.name)
                          )}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.text}>{item.displayName || item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View style={styles.box}>
            <Image source={Images.searchImage} style={styles.image} />
            <Text style={styles.text}>No Results Found</Text>
          </View>
        )
      ) : null}
    </SafeAreaView>
  );
};

export default Contact;
