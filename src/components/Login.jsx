import { Box, Text, VStack, Input, FormControl, Button, HStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet } from 'react-native'
import { useEffect, useState } from "react";
import { API, setAuthToken } from "../config/Api"
 
export default function Login({ navigation }) {
    const [form, setForm] = useState({});
    const [isLogin, setIsLogin] = useState("false");

    const checkLogin = async () => {
      try {
        const response = await AsyncStorage.getItem("isLogin");
        if (response) {
          setIsLogin(response)
        } 
        console.log("ini token : ",response)
      } catch (error) {
        console.log(error);
      }
    };

    console.log("ini state : ", isLogin)
    useEffect(() => {
      checkLogin()
      if(isLogin === "true"){
        navigation.navigate("Home")
     }
    }, [isLogin])
    
  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const logCheck = async () => {
    try {
      const response = await AsyncStorage.getItem("token");
      console.log(response);
      if (response) {
        setAuthToken(response);
        setIsLogin("true");
        navigation.navigate("Home")
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
    const handleOnPress = async () => {
        // const { logCheck } = props;
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const body = JSON.stringify(form);
    
          const response = await API.post("/auth/login", body, config);
          // console.log(response.data);
          if (response) {
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("isLogin", "true");
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user.firstName));
            console.log("cek nama : ", response.data.user.firstName)
            logCheck();
          }
          alert("Berhasil Login", form);
          // navigation.navigate("MyTab");
        } catch (error) {
          console.log(error);
          alert("Tidak Bisa Login", form);
        }
      };

    return (
        <Box>
             <Image style={{ 
                width: "80%",
                marginTop: 100,
                marginLeft: 50,
                }} 
                source={require("../images/LoginIcon.png")}/>
             <Box>
                <Text mt={10} ml={90} fontStyle={"bold"} fontSize={"4xl"}>Login</Text>
                <VStack space={2}>
                    <FormControl>
                        <Input  width={"70%"} mt={10} bgColor={"gray.200"}
                        borderColor={"gray.400"} _ mx={"auto"} placeholder="Email"
                        onChangeText={(value) => handleOnChange("email", value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} _ mx={"auto"} placeholder="Password" type="password" 
                        onChangeText={(value) => handleOnChange("password", value)}
                        />
                    </FormControl>
                    <VStack>
                        <Button onPress={handleOnPress} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={10}>
                            <Text fontSize={"xl"} color={"white"} fontStyle={"semiBold"}>
                                Login
                            </Text>
                        </Button>
                        <HStack mx={"auto"} mt={5}>
                            <Text fontSize={"lg"}>
                                New Users ?
                            </Text>
                            <Text onPress={()=> navigation.navigate("Register")} fontSize={"lg"} ml={2} color={"#ff5555"} fontStyle={"semiBold"}>
                                Register
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
             </Box>
        </Box>
    )
}