import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Animated, TextStyle } from 'react-native';
import { colors } from '../themes';

interface CustomTextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  iconSource?: any;
  rightIconSource?: any;
  rightIconText?: string;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
  error?: string;
}

const CustomTextInput = (props: CustomTextInputProps) => {
  const {
    value,
    onChangeText,
    placeholder,
    iconSource,
    rightIconSource,
    rightIconText,
    secureTextEntry: initialSecureTextEntry,
    onRightIconPress,
    error
  } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(initialSecureTextEntry);
  const [rightIcon, setRightIcon] = useState(rightIconSource);
  const [isFocused, setIsFocused] = useState(false);

  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Removed the native driver
    }).start();
  }, [isFocused, value]);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
    if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute' as 'absolute', 
    left: iconSource ? 36 : 12, 
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -18], 
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], 
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };
  
  

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.inputWrapper, error ? styles.inputWrapperError : null]}>
        <Animated.Text style={labelStyle}>
          {placeholder}
        </Animated.Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          // placeholder={placeholder}
          style={styles.input}
        />
        {rightIconSource || rightIconText ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconContainer}>
            {rightIconSource ? (
              <Image source={rightIconSource} style={styles.rightIcon} />
            ) : (
              <Text style={styles.rightIconText}>{rightIconText}</Text>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    position: 'relative',
  },
  inputWrapperError: {
    borderColor: colors.red,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -1 }],
    paddingLeft: 10,
  },

  rightIcon: {
    width: 20,
    height: 20,
  },
  rightIconText: {
    fontSize: 16,
    color: colors.pink,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    paddingRight: 40,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    marginTop: 4,
  },
  errorImage: {
    tintColor: colors.red,
  },
});

export default CustomTextInput;
