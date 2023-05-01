import { Box, Text, VStack, Input, FormControl, Flex, Pressable, Button, HStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet } from 'react-native'
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; 
import { API, setAuthToken } from "../config/Api"
import { useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useMutation, useQuery } from "react-query";

 
export default function AddCategory({ navigation }) {
    const [form, setForm] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);

    let { data : dataCategory, refetch, isLoading} = useQuery("categoryCaches", async () => {
      let categoryResponse = await API.get("/categories")
      return categoryResponse.data;
  })
    arrColor = ["indigo.400", "green.600", "red.400", "cyan.400", "blueGray.600", "amber.400", "indigo.400", "amber.600", "red.400", "cyan.400", "blueGray.600", "green.400", "indigo.400", "amber.600", "red.900", "cyan.400", "blueGray.400", "green.400"]
    const handleOnChange = (name, value) => {
      setForm({
        ...form,
        [name]: value,
      });
    };


    const handleOnPress = useMutation(async (e) => {
        try {
          const response = await API.post("/categories", form );
          if (response) {
          }
          alert("Add Category Success");
          // navigation.navigate("MyTab");
          refetch()
        } catch (error) {
          console.log(error);
          alert("Failed add Category");
        }
      });

      const deleteHandle = useMutation(async(id) => {
        try{
          const response = await API.delete(`/categories/${id}`, form )
          alert("Category Deleted");
          refetch()
        }catch(err){
          console.log(err)
        }
      })

console.log(form)

    return (
        <Box>
             <Box>
                <Text mt={"20"} ml={90} fontStyle={"bold"} fontSize={"4xl"}>Add Category</Text>
                <VStack space={2}>
                    <FormControl>
                        <Input h={"16"} width={"70%"} mt={10} bgColor={"gray.200"}
                        borderColor={"gray.400"} fontSize={"xl"} mx={"auto"} placeholder="Category Name"
                        onChangeText={(value) => handleOnChange("categoryName", value)}
                        />
                    </FormControl>
                    
                    <VStack>
                        <Button onPress={(e) => handleOnPress.mutate(e)} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={5}>
                            <Text fontSize={"xl"} color={"white"} fontStyle={"semiBold"}>
                               Add Category
                            </Text>
                        </Button>
                        <Text mt={"20"} ml={90} fontStyle={"bold"} fontSize={"4xl"}>List Category</Text>
                        <HStack>
                        <Text ml={90} color={"muted.500"} fontSize={"xl"}>{!isLoading && dataCategory.length} {"Category"}</Text>
                        <MaterialCommunityIcons onPress={() => setDeleteMode(!deleteMode)} name="delete-circle" size={30} color="brown" />
                        </HStack>
                        <HStack ml={20} mt={5}  w={"2/3"} style={{display: "flex", flexWrap: "wrap"}}
                         >
                            {!isLoading && dataCategory?.map((category, i) => (
                                <Text color={"white"} fontSize={"lg"} p={2} px={3} borderRadius={"lg"} mt={2} ml={2} bg={arrColor[i]} key={i}>{category?.categoryName}
                                {"  "}
                                {deleteMode && (
                                <Pressable onPress={()=> deleteHandle.mutate(category._id)}> 
                                  <FontAwesome name="close" size={18} ml color="white" /> 
                                </Pressable>)}
                                </Text>
                            ))}
                        </HStack>
                      
                    </VStack>
                </VStack>
             </Box>
        </Box>
    )
}