import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";

const Stack = createNativeStackNavigator();

// Define a custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5A4AF4", 
    accent: "#1EA5FC", 
    background: "#f5f5f5", 
    text: "#333333", 
    surface: "#ffffff", 
    placeholder: "#888888", 
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"   
        screenOptions={{
          headerTitleStyle: { fontSize: 16 },
        }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{title: "Movie Catch"}} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{title: "Return to Login"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
