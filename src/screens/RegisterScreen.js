import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import Database from './Database';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await Database.insertUser(username, password);
      Alert.alert('Success', 'User registered successfully.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during registration: ', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
