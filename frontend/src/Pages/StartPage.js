import React , { useEffect }from 'react'
import TelegramWidgetLogin from '../component/TelegramWidgetLogin'
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import {useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
export default function StartPage() {
    

    const handleUser=(user)=>{    
        //setLoading(true)
        console.log(user)

        window.open("https://telegram.me/testflmcd_bot");
    }
  return (
<>
<Box
      w="50%"
      m="auto"
      p={10}
      borderRadius={25}
      mt={"100"}
      boxShadow={"dark-lg"}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"3xl"}>Please Login to use our Bot...!</Text>
      </Flex>
<Flex  p={5} m="auto" mt={"20"} justifyContent={"center"} fontSize={20} cursor="pointer">
<TelegramWidgetLogin  botName="testflmcd_bot"  dataOnauth={(user) => handleUser(user)}/>
</Flex>

</Box>
</>
    )
}
