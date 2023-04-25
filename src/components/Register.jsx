import { Box, Text, VStack, Input, FormControl, Button, HStack } from "native-base";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet } from 'react-native'
// import { API } from "../config/Api";

 
export default function Register({ navigation }) {
    return (
        <Box>
             <Image style={{ 
                width: "80%",
                marginTop: 100,
                marginLeft: 50,
                }} 
                source={require("../images/LoginIcon.png")}/>
             <Box>
                <Text mt={10} ml={90} fontStyle={"bold"} fontSize={"4xl"}>Register</Text>
                <VStack space={2}>
                    <FormControl>
                        <Input width={"70%"} mt={10} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Email"/>
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Name"/>
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} mx={"auto"} placeholder="Password" type="password" value=""/>
                    </FormControl>
                    <VStack>
                        <Button onPress={()=>navigation.navigate("Login")} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={10}>
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