import { Box, HStack, Pressable, Center, Icon, useTheme } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import LoginPage from "./Login"
import Detail from "./detail"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListTodo from "./ListTodo";
import AddCategory from "./AddCategory";
import AddTodo from "./AddTodolist";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function Home({navigation}) {
const theme = useTheme()
    return (
        <Tab.Navigator
        initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.colors.muted["800"] },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let colorIcon

          if (route.name === "List Todo") {
            iconName = focused ? "accessible-icon" : "clipboard-list";
          } else if (route.name === "Add Todo") {
            iconName = focused
              ? "accessible-icon"
              : "angellist";

          } else if (route.name === "Add Category") {
            iconName = focused
              ? "accessible-icon"
              : "angellist";
          }

          return <FontAwesome5 name={iconName} size={24} color="angellist" />
        },
        tabBarActiveTintColor: theme.colors.red["800"],
        tabBarInactiveTintColor: theme.colors.muted["800"],
      })}
        >
      <Tab.Screen name="List Todo" component={ListTodo} />
      <Tab.Screen name="Add Todo" component={AddTodo} />
      <Tab.Screen name="Add Category" component={AddCategory} />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
    )
}