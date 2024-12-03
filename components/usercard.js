import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';


export default function Usercard({ name }) {
  return (
    <View style={styles.UserInfoCard}>
<Avatar.Icon size={48} icon="account-circle" />
<Text style={styles.header}>Welcome, {name.length > 10 ? ` ${name.substring(0,10)}...` : name } </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: 'bold', padding: 15, textAlign: 'center' },
  UserInfoCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
