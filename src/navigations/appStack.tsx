import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/home";
import Login from "../screen/login";
import Singup from "../screen/singup";
import SignInAccount from "../screen/account";
import AdminScreen from "../screen/admin";
import Userİnfo from "../screen/userİnfo";
import { GlobalContext, context } from "../context";

const Stack = createNativeStackNavigator();
function appStack() {
    const {authState}=useContext(GlobalContext)
    

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            
            {authState.isLoggedIn ?   <Stack.Screen name="SignInAccount" component={SignInAccount} />  :    
                     <Stack.Screen name="login" component={Login} />
                    }
                    
         
           { authState.isLoggedIn  ? authState.data.user.role == "Admin" ? <Stack.Screen name="AdminScreen" component={AdminScreen} /> :<Stack.Screen name="home" component={Home} />:null}
            <Stack.Screen name="signup" component={Singup} />


            <Stack.Screen name="Userİnfo" component={Userİnfo} />
        </Stack.Navigator>
    )
}
export default appStack;