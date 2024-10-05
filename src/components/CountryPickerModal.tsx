import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { colors } from '../themes';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const CountryPickerModal = () => {
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [callingCode, setCallingCode] = useState('1');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handlePhoneChange = (value: string) => {
        setPhone(value);
        setButtonDisabled(value.length < 10);
    };

    const handleChange = () => {
        setPhone('');
    }
console.log(countryCode);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.form}>
                    <TouchableOpacity onPress={() => setPickerVisible(true)}>
                        <View style={styles.flagView}>
                            <CountryPicker
                                withFlag
                                withCallingCode
                                withFilter
                                withCountryNameButton={false}
                                countryCode={countryCode}
                                visible={isPickerVisible}
                                onSelect={(country) => {
                                    setCountryCode(country.cca2);
                                    setCallingCode(country.callingCode[0]);
                                    setPickerVisible(false);
                                }}
                                onClose={() => setPickerVisible(false)}
                            />
                            <Text style={styles.callingCode}>+{callingCode}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={phone}
                            onChangeText={handlePhoneChange}
                            placeholder="Phone Number"
                            style={styles.inputPhone}
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity style={styles.changeButton} onPress={handleChange}>
                            <Text style={styles.verifyText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CountryPickerModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      
    },
    flagView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7EBF3',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        padding: 10,
        marginRight: 5,
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7EBF3',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        height: 50,
    },
    inputPhone: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    callingCode: {
        fontSize: 16,
        marginLeft: 5,
    },
    verifyText: {
        color: colors.pink,
        fontSize: 16,
        right: 10
    },
    changeButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
