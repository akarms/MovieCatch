import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Text, TextInput, Button, Title } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const userdata = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("Home", { username: userdata.user.displayName });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Title style={styles.title}>Welcome to MovieCatch</Title>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
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
        rules={{ required: "Password is required" }}
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
        onPress={() => navigation.navigate("Register")}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    overflow: "scroll",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
    marginBottom: 20,
  },
  title: { fontSize: 20, textAlign: "center", marginBottom: 30 },
  input: { marginBottom: 15 },
  button: { marginVertical: 10 },
  Registorbutton: { marginVertical: 10, borderColor: "#5A4AF4" },
});
