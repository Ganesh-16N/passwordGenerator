import { Button, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Clipboard from '@react-native-community/clipboard';

export default function App() {
    const [password, setpassword] = useState("")
    const [copy, setCopy] = useState("Copy")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const [schema, setSchema] = useState({
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSpecialChars: false
    })

    const generatePassword = (length: number, includeUppercase: boolean, includeLowercase: boolean, includeNumbers: boolean, includeSpecialChars: boolean) => {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let characters = '';

        if (includeUppercase) characters += uppercaseChars;
        if (includeLowercase) characters += lowercaseChars;
        if (includeNumbers) characters += numberChars;
        if (includeSpecialChars) characters += specialChars;

        let pass = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            pass += characters[randomIndex];
        }

       
        if (length == 0) {
          setError("please enter some length")
          setShowPassword(false);
      }else if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars) {
            setError("Select at least one type")
            setShowPassword(false);
        } else {
            setpassword(pass)
            setCopy("Copy")
            setShowPassword(true);
            setError("")
        }
    };

  

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={"black"}></StatusBar>
      <Text style={styles.heading}>Password Generator</Text>

      <View style={styles.optionsContainer}>
        <View style={styles.textinputContainer}>
          <Text style={styles.password}>Input the length</Text>
          <TextInput
            style={styles.lengthInput}
            placeholder="Password Length"
            placeholderTextColor="white"
            keyboardType="number-pad" // Ensure the keyboard type is numeric
            value={schema.length.toString()} // Bind the input value to schema.length
            onChangeText={(text) => {
              // Update the schema's length when the input changes
              setSchema({ ...schema, length: parseInt(text) || 0 });
            }}
          />
        </View>

        <BouncyCheckbox
          textStyle={styles.checkboxLabel}
          text="Uppercase"
          fillColor="yellow"
          onPress={() => {
            setSchema({ ...schema, includeUppercase: !schema.includeUppercase });
          }}
        />

        <BouncyCheckbox 
          textStyle={styles.checkboxLabel}
          text="Lowercase"
          fillColor="#01CBC6"
          onPress={() => {
            setSchema({ ...schema, includeLowercase: !schema.includeLowercase });
          }}
        />

        <BouncyCheckbox
          textStyle={styles.checkboxLabel}
          text="Numbers"
          fillColor="green"
          onPress={() => {
            setSchema({ ...schema, includeNumbers: !schema.includeNumbers });
          }}
        />

        <BouncyCheckbox
          textStyle={styles.checkboxLabel}
          text="Special Chars"
          fillColor="orange"
          onPress={() => {
            setSchema({ ...schema, includeSpecialChars: !schema.includeSpecialChars });
          }}
        />
      </View>

      <Button
        color="#4834DF"
        title="Generate Password"
        onPress={() => {
          generatePassword(
            schema.length,
            schema.includeUppercase,
            schema.includeLowercase,
            schema.includeNumbers,
            schema.includeSpecialChars
          );
          
        }}
      />

{
    showPassword && <View style={[styles.textinputContainer, {marginTop: 40} ]}>
    <Text style={styles.password}  >{password}</Text>
    <Button title={copy} color={"gray"} onPress={()=>{ Clipboard.setString(password); setCopy("Copied"); setTimeout(()=>{ setCopy("Copy") }, 2000)   }} ></Button>
  </View>
}
{
    error && <Text style={styles.errorTextColor}> {error} </Text>
}
    

     

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1, // Use flex to occupy the whole screen
    backgroundColor: 'black',
    padding: 10,
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 0,
    marginTop:20
  },
  optionsContainer: {
    marginVertical: 20,
    gap:10,
    paddingLeft:20,
    paddingBottom:20
  },
  textinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginVertical: 10,
    gap:20
  },
  lengthInput: {
    borderColor: 'white',
    borderWidth: 2,
    height: 40, 
    color: 'white',
    marginLeft: 10, 
    padding: 5, 
  },
  checkboxLabel: {
    color: 'white',
  },
  password: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 0,
  },
  errorTextColor:{
    color:"#FF3E4D",
    textAlign:"center",
    marginTop:20,
  }
});
