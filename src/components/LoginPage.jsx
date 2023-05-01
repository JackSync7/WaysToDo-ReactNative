import * as React from "react";
import { Text, Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    IconButton,
    HStack,
    Divider} from "native-base"
import  Login  from "../images/login.png"
// import  LoginTitle  from "../images/loginTitle.png"
import { Image, StyleSheet } from 'react-native'
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function LoginPage ({ navigation }) {
    
    const [isLogin, setIsLogin] = useState("false");
    
    const checkLogin = async () => {
      try {
        const response = await AsyncStorage.getItem("isLogin");
        if (response) {
          setIsLogin(response)
        } 
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    console.log(isLogin)
    useEffect(() => {
      checkLogin()
      if(isLogin === "true"){
        navigation.navigate("Home")
     }
    }, [isLogin])

    return (

        <Box safeArea >
            <Image style={style.img} source={Login}/>
            <Box style={style.box} >
                <HStack marginLeft={160} width={"100%"}>
                    <Text fontSize={"5xl"} fontStyle={"bold"}>
                        Ways
                    </Text>
                    <Text 
                    fontSize={"5xl"} 
                    fontStyle={"bold"} 
                    style={{color: "brown"}} 
                    marginLeft={2}
                    >
                        To
                    </Text>
                    <Text fontSize={"5xl"} fontStyle={"bold"} style={{color: "#FF5555"}} >
                        Do
                    </Text>
                </HStack>
            </Box>
            <Text width={"70%"} textAlign={"center"} marginLeft={20} fontSize={"xl"} mt={10}>Write your activity and finish your activity. Fast, Simple and Easy to Use</Text>
            <VStack>
                <Link>
                <Button onPress={() => navigation.navigate("Login")} _text={{ fontWeight: "bold", fontSize: 22}} style={{backgroundColor: "#FF5555"}} width={'70%'} height={50} fontSize={"4xl"} marginLeft={90} marginTop={50} >Login</Button>
                </Link>
                <Link>
                <Button onPress={()=>navigation.navigate("Register")} _text={{ fontWeight: "bold", fontSize: 22}} style={{backgroundColor: "#ccc"}} width={'70%'} height={50} fontSize={"4xl"} marginLeft={90} marginTop={5} >Register</Button>
                </Link>
            </VStack>
        </Box>
    )
}

const style = StyleSheet.create({
    img: {
        width: "80%",
        marginLeft: 50,
    },
    box:{
        width: '50%',
    }
})