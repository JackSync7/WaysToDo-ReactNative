import { Box, HStack, Pressable, Center, Icon } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import NavButton from "./NavButton"

import { Text, View } from 'react-native';

import LoginPage from "./Login"
import Detail from "./detail"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

    return (
        <Tab.Navigator>
      <Tab.Screen name="LoginPage" component={LoginPage} />
      <Tab.Screen name="Detail Todo" component={Detail} />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
    )
}