import React from "react";
import {View, Button, StyleSheet} from 'react-native'

export default function MyButton ({nameBtn, handleOnPress}) {
    return (
        <View style={styles.viewBtn}>
            <Button style={styles.btn} title={nameBtn} onPress={handleOnPress} color={'red'} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
        
    },
    btn: {
        margin: 0
    }
})