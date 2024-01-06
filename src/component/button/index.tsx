import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from "./style"
import getSizeValue from '../../utils/getSizeValue';

const Button = ({ onPress, title, style, size="md",textStyle, ...props }:any) => {
    const marginHorizontal = getSizeValue(size);
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button,{marginHorizontal}, style]} {...props}>
            <Text style={[styles.buttonText,textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};
export default Button;