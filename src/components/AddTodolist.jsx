import { Box, Text, VStack, Input, FormControl, Flex, Option, Button, HStack, Select } from "native-base";
import { LoginIcon } from "../images/LoginIcon.png"
import { Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; 
import { API, setAuthToken } from "../config/Api"
import { useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';  
import { useMutation, useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { SelectList } from 'react-native-dropdown-select-list'


 
export default function AddCategory({ navigation }) {

const [date, setDate] = useState(new Date())
const [showPicker, setShowPicker  ] = useState(false)
const dateTransform = JSON.stringify(date).split("T")[0]
const dateResult = dateTransform.slice(1, date.length)
const [selected, setSelected] = React.useState("");

let { data : dataCategory, refetch, isLoading} = useQuery("categoryCaches", async () => {
  let categoryResponse = await API.get("/categories")
  return categoryResponse.data;
})

const data = () =>{
  return(
    !isLoading && dataCategory.map((data) => (
      {key: data._id, value:data.categoryName}
    ))
  )
}



const [form, setForm] = useState(
  {
    title: '',
    description: '',
    status: '0',
    date: '',
    categoryId: [],
  })

    arrColor = ["indigo.400", "green.600", "red.400", "cyan.400", "blueGray.600", "amber.400", "indigo.400", "amber.600", "red.400", "cyan.400", "blueGray.600", "green.400", "indigo.400", "amber.600", "red.900", "cyan.400", "blueGray.400", "green.400"]
    
    const handleOnChange = (name, value) => {
      setForm({
        ...form,
        [name]: value,
      });
    };
    const togglePicker = () => {
      setShowPicker(!showPicker)
    }
    const onChangePicker = ({type}, seletedDate) => {
      if(type == "set"){
        const currentDate = seletedDate
        setDate(currentDate)
      }else{
        togglePicker()
      }
    }
    console.log(form)
    console.log(dateResult)

    useEffect(() => {
      setForm({
        ...form,
        ['categoryId']: [selected],
      });
    }, [selected])

    useEffect(() => {
      setForm({
        ...form,
        ['date']: dateResult,
      });
    }, [date])
    
    const handleOnPress = useMutation(async (e) => {
      e.preventDefault()
      try{
          const response = await API.post("/todolists", form)
          refetch()
          alert("add List successfully")
      } catch (error) {
          console.log(error)
          alert("add List failed")
      }

  })

    return (
        <Box>
             <Box>
                <Text mt={"20"} ml={90} fontStyle={"bold"} fontSize={"4xl"}>Add List</Text>
                <VStack space={2}>
                    <FormControl>
                        <Input h={"16"} width={"70%"} mt={10} bgColor={"gray.200"}
                        borderColor={"gray.400"} fontSize={"xl"} mx={"auto"} placeholder="Title"
                        onChangeText={(value) => handleOnChange("title", value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Input h={"16"} width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} fontSize={"xl"} mx={"auto"} placeholder="Description"
                        onChangeText={(value) => handleOnChange("description", value)}
                        />
                    </FormControl>
                    <FormControl>
                      <HStack>
                        <Button  h={"16"} width={"70%"} mt={5} bgColor={"gray.200"}
                        borderColor={"gray.400"} border fontSize={"xl"} mx={"auto"} _text={{color: "muted.500", fontSize: "lg"}} onPress={() => setShowPicker(true)} >
                          <Fontisto name="date" size={24} color="gray" style={{position: "absolute", left: -40}} />
                          {date ? dateResult : "Select Date"}
                          </Button>
                        </HStack>
                    </FormControl>
                   
                    <FormControl mx={"auto"}  mt={5} maxW="420" isRequired isInvalid>
                    
                      <SelectList 
                      
                      style={{width: "100%"}}
                      setSelected={(key) => setSelected(key)} 
                      data={data()} 
                      save="key"
                      onChange={(value) => handleOnChange("description", value)}
                      />
                  
                  </FormControl>
                  <Pressable onClick={() => alert("ahhh")}>
                    <Text>press Me</Text>
                  </Pressable>
                    
                    {showPicker && (
                    <DateTimePicker mode="date" display="spinner" value={date} onChange={onChangePicker}
                      />
                      )}
                     
                    <VStack>
                        <Button onPress={(e) => handleOnPress.mutate(e)} w={"70%"} mx={"auto"} bgColor={"#ff5555"} mt={5}>
                            <Text fontSize={"xl"} color={"white"} fontStyle={"semiBold"}>
                               Add Category
                            </Text>
                        </Button>
                        
                      
                    </VStack>
                </VStack>
             </Box>
            
        </Box>
    )
}