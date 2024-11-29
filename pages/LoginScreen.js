import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import { DefaultTheme, DarkTheme } from 'react-native-paper';


export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigation.navigate('Home', { username: data.email });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {/* Login Button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        Login
      </Button>
      {/* Navigate to Register */}
      <Button
        mode="outlined"
        style={styles.Registorbutton}
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 30 },
  input: { marginBottom: 15 },
  button: { marginVertical: 10 },
  Registorbutton: { marginVertical: 10, borderColor: '#5A4AF4' },
});
