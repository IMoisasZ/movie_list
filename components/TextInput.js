import React from "react";
import {View, Text, TextInput, StyleSheet} from 'react-native'

export default function Input ({value, handleOnChange}) {
    return (
        <View style={styles.viewTextInput}>
            <TextInput style={styles.textInput} value={value} onChangeText={handleOnChange} placeholderTextColor={'#fff'} placeholder='Digite no minimo 3 letras para pesquisar o filme'/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewTextInput: {
        alignItems: 'center',
        justifyContent: 'center'
    },  
    textInput: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        width: 300,
        color: '#fff',
        textAlign: 'center',
        marginRight: 2
    },

})