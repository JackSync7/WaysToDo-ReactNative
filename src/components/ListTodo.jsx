import { Box, Text, HStack, VStack, ScrollView, Image, Select, Flex, Input, Pressable, Center, Icon, Heading, View, Button } from "native-base";
// import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons"; 
import { API } from "../config/Api"
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ListTodo({navigation}) {
    const [deleteMode, setDeleteMode] = useState(false)
    const [getTodoList, setTodoList] = useState([])
    const [getCategory, setCategory] = useState("")
    const [service, setService] = useState([])
    // const [getCategorySum, setCategory] = useState([])

    let { data : dataTodo, refetch, isLoading} = useQuery("todoCaches", async () => {
        let categoryResponse = await API.get("/todolists?$lookup=*")
        return categoryResponse.data;
    })
    const getData = async () => {
        try {
            const res = await API.get("/todolists")
           
            setTodoList(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const DeleteList = async () => {
        try {
            const res = await API.delete("/todolists")
           
            setTodoList(res.data)
        }catch(err){
            console.log(err)
        }
    }
useEffect(() => {
    getData()
    refetch()
}, [])

// const dataCat = async (id) => {
//     const res = await axios.API.get(`categories/${data.categoryId}`)
//     setCategory(res)
//     console.log("ini categorynya ya : ", res)
// }
arrColor = ["indigo.100", "green.200", "red.100", "cyan.100", "blueGray.200", "amber.100", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200", "indigo.100", "amber.50", "red.100", "cyan.100", "blueGray.200", "green.200"]
arrColorCategory = ["indigo.500", "green.600", "red.500", "cyan.500", "blueGray.600", "amber.500", "indigo.500", "amber.400", "red.500", "cyan.500", "blueGray.600", "green.600", "indigo.500", "amber.800", "red.500", "cyan.500", "blueGray.600", "green.600"]

const logout = async () => {

    try {
      const response = await AsyncStorage.removeItem("isLogin")
      console.log(response);
        navigation.navigate("Login")
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <Box>
        <HStack>
            <VStack>
                <HStack>
                    <Heading style={{fontWeight: "bold"}} px={"12"} py={2} pt={5} size={"2xl"} >Hi, Jeri</Heading>
                    <Button onPress={()=>logout()} h={10} _text={{color: "white"}} bg={"red.500"} borderRadius={"md"} borderColor={"red.500"} mt={6}>Logout</Button>
                </HStack>
                    <HStack>
                    <Text px={"12"} color={"red.400"} fontSize={"xl"} >{getTodoList.length}  Lists</Text>
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
                <Input bg={"muted.200"} borderRadius={"lg"}  placeholder="Search List" borderColor={"muted.400"} />
                <HStack mt={4} style={{display: "flex", gap: 7}} >
                    <Input type="date" w={"40"} h={"10"} bg={"muted.200"} borderRadius={"lg"}  placeholder="Choose Date" borderColor={"muted.400"} />
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
            <HStack mx="auto" w="100%" style={{display: "flex", justifyContent: "space-around"}}>
            <MaterialCommunityIcons name="delete" size={32} color="#D21312" />
            <Pressable onPress={() => refetch()}>
            <Feather name="refresh-ccw" size={32} color="black" />
            </Pressable>
            </HStack>
        <ScrollView  h="70%">
            <VStack style={{display: "flex", flexDirection: "column-reverse"}}>
        {!isLoading && dataTodo?.map((data, i) => (
            <Box  bgColor={arrColor[i]} shadow={2} mt={5} w={"85%"} p={5} mx={"auto"} borderRadius={"2xl"}> 
                <Box key={i}> 
                    <HStack >
                        <VStack w={"3/4"} > 
                            <Heading onPress={()=> navigation.navigate("Detail", 
                            {idTodo: data._id, idCate: data.categoryId.map((cate) => cate._id)})} 
                            style={{fontWeight: "bold"}} size={"lg"} >{data.title}</Heading>
                            <Box  h={"10"} mt={"3"}>
                            <Text color={"coolGray.500"}>{data.description}</Text>
                            </Box>
                            <Text color={"coolGray.500"} mt={"7"}>{data.date}</Text>
                        </VStack>
                        <VStack p={5}>
                            <Box bg={arrColorCategory[i+1]} p={1} px={2} borderRadius={"lg"}>
                                <Text color={"white"}>
                                    {data.categoryId.map((cate) => cate.categoryName)}
                                
                                </Text>
                            </Box>
                            <Box mx={"auto"} my={"auto"}>
                                {data?.status === "0" ? 
                                <Pressable onPress={()=> handleUpdateStatus}>
                                    <AntDesign name="exclamationcircleo" size={48} color="gray" />
                                </Pressable>
                                : <AntDesign name="checkcircle" size={48} color="green" />}
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
        ))}
        </VStack>
        </ScrollView>
        {/* <NavButton/> */}
      </Box>
    )
}


