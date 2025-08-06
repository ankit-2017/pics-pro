import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import UserButton from '@/components/ui/Button';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Add any logout logic here if needed
    router.replace('/'); // Navigate to home screen
  };

  return (
    <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24, fontFamily: 'Signika', fontWeight: 'bold', marginBottom: 20 }}>You were Logged Out! {'\n'}Login again to continue</Text>
        <UserButton
            title="Login"
            onPress={handleLogout}
            type="linear"
            backgroundColor={["#f73946", "#e0468e"]}
            customStyles={{ marginTop: 16 }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#3f4075',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});