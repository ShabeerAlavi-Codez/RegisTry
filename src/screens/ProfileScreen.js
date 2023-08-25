
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Database from './Database';

const ProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await Database.getUserById(userId);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = () => {
    // Navigate to EditProfileScreen or implement editing logic here
  };

  const handleDeleteProfile = async () => {
    try {
      await Database.deleteUser(userId);
      Alert.alert('Success', 'User profile deleted.');
      navigation.navigate('Home'); // Or any other appropriate screen
    } catch (error) {
      console.error('Error deleting user profile: ', error);
    }
  };

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Username: {userData.username}</Text>
      <Text>Password: ********</Text>
      <Button title="Edit Profile" onPress={handleEditProfile} />
      <Button title="Delete Profile" onPress={handleDeleteProfile} />
    </View>
  );
};

export default ProfileScreen;
