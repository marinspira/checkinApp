import { Stack } from "expo-router";

export default function publicScreensLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="home" options={{}} />
            <Stack.Screen name="login" options={{}} />
            <Stack.Screen name="owner" options={{}} />
            <Stack.Screen name="signup" options={{}} />
            <Stack.Screen name="volunteers" options={{}} />
        </Stack>
    )
}
