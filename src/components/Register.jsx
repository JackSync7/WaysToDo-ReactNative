import { Box, Text, VStack, Input, FormControl, Button, HStack } from "native-base";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet } from 'react-native'
import { API } from "../config/Api";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API } from "../config/Api";

 
export default function Register({ navigation }) {
    const [form, setForm] = useState({});
    const handleOnChange = (name, value) => {
      setForm({
        ...form,
        [name]: value,
      });
    };
    console.log(JSON.stringify(form));
    const handleOnPress = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const body = JSON.stringify(form);
          console.log(body);
          const response = await API.post("/auth/register", body, config);
          console.log(response);
          if (response) {
            await AsyncStorage.setItem("token", response.data.token);
          }
          alert("Berhasil");
          navigation.navigate("Login");
        } catch (error) {
          console.log(error);
          alert("Gagal");
        }
      };

    return (
        <Box>
             <Image style={{ 
                width: "80%",
                
                marginLeft: 50,
                }} 
                source={require("../images/LoginIcon.png")}/>
             <Box>
                <Text mt={5} ml={90} fontStyle={"bold"} fontSize={"4xl"}>Register</Text>
                <VStack space={2}>
                <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="First Name" onChangeText={(value) => handleOnChange("firstName", value)}
                        />
                    </FormControl>
                <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Last Name" onChangeText={(value) => handleOnChange("lastName", value)}
                        
                        />
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Email"
                        onChangeText={(value) => handleOnChange("email", value)}
                
                        />
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Password" type="password"  onChangeText={(value) => handleOnChange("password", value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Phone Number" type="text"
                        onChangeText={(value) => handleOnChange("phoneNumber", value)}
                 />
                    </FormControl>
                    <VStack>
                        <Button onPress={handleOnPress} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={10}>
                            <Text fontSize={"xl"} color={"white"} fontStyle={"semiBold"}>
                                Register
                            </Text>
                        </Button>
                        <HStack mx={"auto"} mt={5}>
                            <Text fontSize={"lg"}>
                                Joined Us Before ?
                            </Text>
                            <Text onPress={()=> navigation.navigate("Login")} fontSize={"lg"} ml={2} color={"#ff5555"} fontStyle={"semiBold"}>
                                Login
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
             </Box>
        </Box>
    )
}