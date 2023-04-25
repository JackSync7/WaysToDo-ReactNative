import * as React from "react";
import { Text, Box, Center } from "native-base";
import {View} from "react-native"
import LoginPage  from "./src/components/LoginPage"
import Home from "./src/components/Home"
import Login from "./src/components/Login"
import Register from "./src/components/Register"
import Detail from "./src/components/detail"
import NavButton from "./src/components/NavButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

export default function Container() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Main"
        >
            <Stack.Screen 
                name="Main"
                component={LoginPage}
            />
            <Stack.Screen 
                name="Main"
                component={Home}
            />
            <Stack.Screen 
                name="Detail"
                component={Detail}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
            />
            <Stack.Screen 
                name="Register"
                component={Register}
            />
            <Stack.Screen 
                name="NavButton"
                component={NavButton}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}