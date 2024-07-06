import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AuthProvider, AuthContext } from '@/contexts/AuthContext/AuthContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/owner" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(guest)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  salutation: {
    fontSize: 25,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -80,
    marginBottom: 40,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#000",
    // borderWidth: 1,
    marginBottom: 5,
    width: 250,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  btnText: {
    fontFamily: "SpaceMono",
    textTransform: "lowercase",
    color: "#000",
    fontSize: 17,
  },
  btnTextBold: {
    fontSize: 20,
    fontWeight: "600",
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});