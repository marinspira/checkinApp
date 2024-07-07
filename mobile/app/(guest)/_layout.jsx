import { Redirect, Tabs } from "expo-router";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from '@/contexts/AuthContext/AuthContext'

export default function TabsLayout() {

    const { user } = useContext(AuthContext)

    if (user) {
        return (
            <Tabs
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'home') {
                            iconName = 'home';
                        } else if (route.name === 'account') {
                            iconName = focused ? 'user' : 'user-o';
                        } else if (route.name === 'staff') {
                            iconName = 'list-outline';
                        } else if (route.name === 'notifications') {
                            iconName = 'bells';
                        } else if (route.name === 'chat') {
                            iconName = focused ? 'chatbox' : 'chatbox-outline';
                        }

                        let IconComponent = FontAwesome;

                        if (route.name === 'staff') {
                            IconComponent = Ionicons;
                        }

                        if (route.name === 'chat') {
                            IconComponent = Ionicons;
                        }

                        if (route.name === 'notifications') {
                            IconComponent = AntDesign;
                        }

                        if (route.name === 'home') {
                            IconComponent = AntDesign;
                        }

                        return (
                            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                                <IconComponent name={iconName} size={24} color={color} />
                            </View>
                        );
                    },
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: "#fff",
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { paddingBottom: 25, height: 70, backgroundColor: "#fff", borderTopWidth: 0 },
                    tabBarLabel: () => null
                })}
            >
                <Tabs.Screen
                    name="account"
                    options={{
                        href: {
                            pathname: "/(guest)/account",
                        },
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="staff"
                    options={{
                        href: {
                            pathname: "./(screens)/staff",
                        },
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.lilac,
                            borderWidth: 0
                        },
                        headerTitleStyle: {
                            color: 'white',
                            textTransform: 'uppercase',
                            fontSize: 18
                        },
                    }}
                />
                <Tabs.Screen
                    name="home"
                    options={{
                        href: "/(guest)/home",
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        href: {
                            pathname: "/(guest)/notifications",
                        },
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.lilac,
                            borderWidth: 0
                        },
                        headerTitleStyle: {
                            color: 'white',
                            textTransform: 'uppercase',
                            fontSize: 18
                        },
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        href: {
                            pathname: "/(guest)/chat",
                        },
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.lilac,
                            borderWidth: 0
                        },
                        headerTitleStyle: {
                            color: 'white',
                            textTransform: 'uppercase',
                            fontSize: 18
                        },
                    }}
                />
            </Tabs>
        );
    } else {
        return <Redirect href='/'/>
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    iconContainerFocused: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        marginTop: -10,
        borderRadius: 100,
        backgroundColor: Colors.lilac,
        borderColor: "#fff",
        borderWidth: 8
    }
});
