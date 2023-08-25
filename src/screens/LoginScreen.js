import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import Database from './Database';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await Database.getUserByUsernameAndPassword(username, password);

      if (user) {
        navigation.navigate('Profile', { userId: user.id });
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login: ', error);
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;