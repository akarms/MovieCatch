import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Text, TextInput, Button, Title, ActivityIndicator } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: data.name,
      });

      alert("Registration Successful");
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>

      {/* Name Field */}
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            label="Name"
            mode="outlined"
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            label="Email"
            mode="outlined"
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            label="Password"
            mode="outlined"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? <ActivityIndicator animating={true} color="#fff" /> : 'Sign Up'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 30 },
  input: { marginBottom: 15 },
  button: { marginVertical: 10 },
  error: { color: 'red', marginBottom: 10, fontSize: 12 },
});
