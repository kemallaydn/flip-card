import { Platform, SafeAreaView, View } from "react-native"
import React, { useContext } from "react";
import styles from "./style";
import Tab from "../tab";
import { GlobalContext } from "../../context";

const Container= ({ children}:any) => {
    const {authState}=useContext(GlobalContext)
    return (
        <View style={styles.container}>
            {children}
            {authState.isLoggedIn && <Tab/>}

        </View>
    )
}
export default Container;