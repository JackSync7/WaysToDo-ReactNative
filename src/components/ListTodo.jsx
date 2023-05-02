import { Box, Text, HStack, VStack, ScrollView, FormControl, Image, Select, Flex, Input, Pressable, Center, Icon, Heading, View, Button } from "native-base";
// import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons"; 
import { API } from "../config/Api"
import { useMutation, useQuery } from "react-query";
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ListTodo({navigation}) {
    const [getProfile, setProfile] = useState("")
    const [deleteMode, setDeleteMode] = useState(false)
    const [getTodoList, setTodoList] = useState([])
    const [Data, setData] = useState([])
    const [DataFilter, setDataFilter] = useState([])
    const [search, setSearch] = useState({
        search: ""
    })

    const [getCategory, setCategory] = useState("")
    const [service, setService] = useState([])
    // const [getCategorySum, setCategory] = useState([])

    let { data : dataTodo, refetch, isLoading} = useQuery("todoCaches", async () => {
        let categoryResponse = await API.get("/todolists?$lookup=*")
        return categoryResponse.data;
    })



    useEffect(() => {
        if (!isLoading) {
          
        }
      }, [isLoading]);
      console.log("hasil filter : ", Data)
    const getData = async () => {
        try {
            const res = await API.get("/todolists")
           
            setTodoList(res.data)
        }catch(err){
            console.log(err)
        }
    }
    
    const cekLogin = async () => {
        try {
            const response = await AsyncStorage.getItem("isLogin")
            if(!response){
                
                setProfile(profileResponse.toString)
                console.log("ini status : " + response)
                navigation.navigate("Login")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getname = async () => {
        try {
            const profileResponse = await AsyncStorage.getItem("user")
            if(profileResponse){
                setProfile(profileResponse)
                console.log("ini status : " + profileResponse)
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const DeleteList = async (idList) => {
        try {
            const res = await API.delete(`/todolists/${idList}`)
            alert("delete completed")
            refetch()
        }catch(err){
            console.log(err)
        }
    }

    const handleUpdateStatus = useMutation( async (idList) => {
        try{
            const result = await API.patch(`/todolists/${idList}`, {status: "1"})
            console.log(result)
            refetch()
        }catch(err){
            console.log(err)
        }
    })
    const handleUpdateStatusFalse = useMutation( async (idList) => {
        try{
            const result = await API.patch(`/todolists/${idList}`, {status: "0"})
            console.log(result)
           
        }catch(err){
            console.log(err)
        }
    })

useEffect(() => {
    getData()
    getname()
}, [])
useEffect(() => {
    cekLogin()
}, [])

const data = () =>{
    return(
      !isLoading && getTodoList.map((data) => (
        {key: data._id, value:data.title}
      ))
    )
  }
  

const handleSearch = (name, value) => {
    if(value.length > 3){
    setDataFilter(dataTodo?.filter((index) => index.title.includes(value)));
    setSearch({
      ...search,
      [name]: value,
    });
}
  };
console.log("ini hasil search : ", getProfile)

arrColor = ["indigo.100", "green.200", "red.100", "cyan.100", "blueGray.200", "amber.100", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200", "indigo.100", "green.200", "red.100", "cyan.100", "blueGray.200", "amber.100", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200"]
arrColorCategory = ["indigo.500", "green.600", "red.500", "cyan.500", "blueGray.600", "amber.500", "indigo.500", "amber.400", "red.500", "cyan.500", "blueGray.600", "green.600", "indigo.500", "amber.800", "red.500", "cyan.500", "blueGray.600", "green.600", "indigo.500", "green.600", "red.500", "cyan.500", "blueGray.600", "amber.500", "indigo.500", "amber.400", "red.500", "cyan.500", "blueGray.600", "green.600", "indigo.500", "amber.800", "red.500", "cyan.500", "blueGray.600", "green.600"]

const logout = async () => {

    try {
      const response = await AsyncStorage.removeItem("isLogin")
      console.log(response);
        navigation.navigate("Login")
    } catch (error) {
      console.log(error);
    }
  };
  console.log(getProfile)
    return (
      <Box>
        <HStack>
            <VStack>
                <HStack>
                    <Heading style={{fontWeight: "bold"}} px={"12"} py={2} pt={5} size={"2xl"} >Hi, {getProfile}</Heading>
                    <Button onPress={()=>logout()} h={10} _text={{color: "white"}} bg={"red.500"} borderRadius={"md"} borderColor={"red.500"} mt={6}>Logout</Button>
                </HStack>
                    <HStack>
                    <Text px={"12"} color={"red.400"} fontSize={"xl"} >{DataFilter.length}  Lists</Text>
                    </HStack>
            </VStack>
                <Image  size={20} top={0} style={{ 
                    // width: "80%",
                    position: "absolute",
                    right: 50,
                    top: -80,
                    marginTop: 100,
                    marginLeft: 50,

                    }} 
                    source={require("../images/profile.png")}/>
        </HStack>
            <VStack w={"85%"} mx={"auto"} mt={5} mb={4}>
                <Input bg={"muted.200"} onChangeText={(value) => handleSearch("search", value)} borderRadius={"lg"} name="search" placeholder="Search List" borderColor={"muted.400"} />
               
                <HStack mt={4} style={{display: "flex", gap: 7}} >
                    {/* <Input  type="date" w={"40"} h={"10"} bg={"muted.200"} borderRadius={"lg"}  placeholder="Choose Date" borderColor={"muted.400"} />
                    <Input  type="date" w={"40"} h={"10"} bg={"muted.200"} borderRadius={"lg"}  placeholder="Choose Date" borderColor={"muted.400"} />
                    <Input  type="date" w={"40"} h={"10"} bg={"muted.200"} borderRadius={"lg"}  placeholder="Choose Date" borderColor={"muted.400"} /> */}
                    {/* <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                    </Select> */}
                </HStack>
            </VStack>
            <HStack pb={2} mx="auto" w="100%" style={{display: "flex", justifyContent: "space-around"}}>
            <Pressable onPress={()=> setDeleteMode(!deleteMode)}>
                <MaterialCommunityIcons name="delete" size={32} color="#D21312" />
            </Pressable>
            <Pressable onPress={() => refetch()}>
                <Feather name="refresh-ccw" size={32} color="black" />
            </Pressable>
            </HStack>
        <ScrollView  h="70%">
            <VStack style={{display: "flex", flexDirection: "column-reverse"}}>
        {DataFilter.length < 1 ? dataTodo?.map((data, i) => (
            <Box  bgColor={arrColor[i]} shadow={2} mt={5} w={"85%"} p={5} mx={"auto"} borderRadius={"xl"}> 
                <Box key={i}> 
                    <HStack >
                        {deleteMode && (
                        <Box my={"auto"} mr={3}>
                             {/* =======================Delete List======================== */}
                            <Pressable onPress={()=> DeleteList(data._id)}>
                            <MaterialCommunityIcons name="delete" size={32} color="#D21312" />
                            </Pressable>
                        </Box>
                        )}
                        <VStack maxW={"4/6"} > 
                            <Heading onPress={()=> navigation.navigate("Detail", 
                            {idTodo: data._id, idCate: data.categoryId.map((cate) => cate._id)})} 
                            style={{fontWeight: "bold"}} size={"lg"} >{data.title}</Heading>
                            <Box  h={"10"} mt={"3"}>
                            <Text color={"coolGray.500"}>{data.description}</Text>
                            </Box>
                            <Text color={"coolGray.500"} mt={"7"}>{data.date}</Text>
                        </VStack>
                        <VStack p={5} minW={"2/6"}>
                            <Box bg={arrColorCategory[i+1]} p={1} mx={"auto"} px={5} borderRadius={"lg"}>
                                <Text color={"white"} fontStyle={"bold"}>
                                    {data.categoryId.map((cate) => cate.categoryName)}
                                
                                </Text>
                            </Box>
                            <Box mx={"auto"} mt={5} my={"auto"}>
                                {/* ===============ini status================ */}
                                {data?.status === "0" ? 
                                <Pressable onPress={()=> handleUpdateStatus.mutate(data._id)}>
                                    <AntDesign name="exclamationcircleo" size={48} color="gray" />
                                </Pressable>
                                : 
                                <Pressable onPress={()=> handleUpdateStatusFalse.mutate(data._id)}>
                                    <AntDesign name="checkcircle" size={48} color="green" />
                                </Pressable>}
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
        ) ) 
        : 
        DataFilter?.map((data, i) => (
            <Box  bgColor={arrColor[i]} shadow={2} mt={5} w={"85%"} p={5} mx={"auto"} borderRadius={"xl"}> 
                <Box key={i}> 
                    <HStack >
                        {deleteMode && (
                        <Box my={"auto"} mr={3}>
                             {/* =======================Delete List======================== */}
                            <Pressable onPress={()=> DeleteList(data._id)}>
                            <MaterialCommunityIcons name="delete" size={32} color="#D21312" />
                            </Pressable>
                        </Box>
                        )}
                        <VStack maxW={"4/6"} > 
                            <Heading onPress={()=> navigation.navigate("Detail", 
                            {idTodo: data._id, idCate: data.categoryId.map((cate) => cate._id)})} 
                            style={{fontWeight: "bold"}} size={"lg"} >{data.title}</Heading>
                            <Box  h={"10"} mt={"3"}>
                            <Text color={"coolGray.500"}>{data.description}</Text>
                            </Box>
                            <Text color={"coolGray.500"} mt={"7"}>{data.date}</Text>
                        </VStack>
                        <VStack p={5} minW={"2/6"}>
                            <Box bg={arrColorCategory[i+1]} p={1} mx={"auto"} px={5} borderRadius={"lg"}>
                                <Text color={"white"} fontStyle={"bold"}>
                                    {data.categoryId.map((cate) => cate.categoryName)}
                                
                                </Text>
                            </Box>
                            <Box mx={"auto"} mt={5} my={"auto"}>
                                {/* ===============ini status================ */}
                                {data?.status === "0" ? 
                                <Pressable onPress={()=> handleUpdateStatus.mutate(data._id)}>
                                    <AntDesign name="exclamationcircleo" size={48} color="gray" />
                                </Pressable>
                                : 
                                <Pressable onPress={()=> handleUpdateStatusFalse.mutate(data._id)}>
                                    <AntDesign name="checkcircle" size={48} color="green" />
                                </Pressable>}
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
        ) )
        }
        </VStack>
        </ScrollView>
        {/* <NavButton/> */}
      </Box>
    )
}


