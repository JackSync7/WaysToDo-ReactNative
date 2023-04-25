import { Box, Text, HStack, Pressable, Center, Icon } from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import NavButton from "./NavButton"
import { API } from "../config/Api"
import axios from "axios"

export default function Detail() {
    const [getCategory, setCategory] = useState([])
    const getData = async () => {
        try {
            const res = await API.get("/category")
            console.log(res.data)
            setCategory(res.data)
        }catch(err){
            console.log(err)
        }
    }
useEffect(() => {
    getData()
 
}, [])


    
    return (
      <Box>
        {getCategory.map((data, i) => (

        <Text key={i}>{data.categoryName}</Text>
        ))}
        <Text>INI HOME</Text>
        <NavButton/>
      </Box>
    )
}