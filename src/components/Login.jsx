import { Box, Text, VStack, Input, FormControl, Button, HStack } from "native-base";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet } from 'react-native'
 
export default function Login({ navigation }) {
    const [getInput, setInput] = useState("")
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
                        borderColor={"gray.400"} _ mx={"auto"} placeholder="Email"/>
                    </FormControl>
                    <FormControl>
                        <Input width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} _ mx={"auto"} placeholder="Password" type="password" />
                    </FormControl>
                    <VStack>
                        <Button onPress={()=>navigation.navigate("Home")} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={10}>
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