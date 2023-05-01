import { Box, View, Divider, Text, Heading, HStack, VStack, Badge, Pressable, Center, Icon } from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NavButton from "./NavButton"
import { API } from "../config/Api"
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from "axios"


export default function Detail({route, navigation}) {
    const idCat = route.params;
    const [getTodoList, setTodoList] = useState([])
    const [getCategory, setCategory] = useState([])
    const getData = async () => {
        try {
            const res = await API.get(`/todolists/${idCat.idTodo}`) 
            setTodoList(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const Category = async () => {
        try {
            const res = await API.get(`/categories/${idCat.idCate}`) 
            setCategory(res.data)
        }catch(err){
            console.log(err)
        }
    }

useEffect(() => {
    getData()
    Category()
}, [])

    return (
        <Box>
      <Box p={10}>
        
        <View  borderRadius={"xl"} bgColor={"blue.200"} p={10}>
            <VStack  >
                <HStack>
                    <Box>
                    <Heading mt={5} bg={"indigo.200"} style={{fontWeight: "bold", fontSize: 28}}>{getTodoList.title}</Heading>
                    </Box><Divider orientation="vertical" mx="3" _light={{
          bg: "muted.400"
        }} _dark={{
          bg: "muted.50"
        }} />
                    <Box mx={"auto"} style={{textAlign: "right"}}>
                    <Badge p={2} colorScheme="info" rounded={"xl"}   >
                        {getCategory.categoryName}
                    </Badge>
                    </Box>
                </HStack>
                <Box mt={10} _text={{color: "muted.600", fontSize: 18}}>
                    {getTodoList.description}
                </Box>
                <HStack>
                <Box mt={9}>
                <MaterialIcons name="date-range" size={24} color="gray" />
                </Box >
                <Box mt={10} _text={{color: "muted.800", fontSize: 18}}>
                    {getTodoList.date}
                </Box>
                </HStack>
            </VStack>
        </View>
      </Box>
     
      </Box>
    )
}