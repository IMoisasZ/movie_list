import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native'
import { MaterialIcons, Ionicons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListFavorite({setShowFvorite}) {
    const [list, setList] = useState([])

    useEffect(() => {
        const result = async() => {
            const data = await getData()
            setList(data)
        }
        result()
    },[])
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('fav')
          console.log(JSON.parse(jsonValue));
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          console.log({e});
        }
      }
    return (
        <View style={styles.container}>
            <AntDesign name="back" size={24} color="#fff" onPress={() => setShowFvorite(false)} />
            <ScrollView>
                {list.map((item) => {
                    return (
                        <View style={styles.viewData}>
                            <Image style={styles.stretch} source={{uri:item.Poster}}/>
                            <View style={styles.viewFav}>
                                {/* <MaterialIcons name="favorite" size={24} color="red" onPress={handleWriteFavorite}/> */}
                                <Text style={styles.title} key={item.imdbId} onPress={() => alert('Ir para outra tela mostrando os dados do filme')}>
                                    {item.Title}
                                </Text>
                                <Ionicons name="md-information-circle-sharp" size={24} color="#fff" style={styles.information} />
                            </View>

                        </View>)})}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      color: '#fff',
    },
  
    viewBusca: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50
    },
  
    resultBusca: {
      color: '#fff',
    },
  
    viewData: {
      width: 300,
      height: 300,
      marginVertical: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    stretch: {
      width: 300,
      height: 300,
      resizeMode: 'stretch',
    },
  
    viewImage: {
      minHeight: 300,
    },
  
    title: {
      color: '#fff',
      maxWidth: 300
    },
  
    viewFav: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 300,
      justifyContent: 'space-between',
      paddingVertical: 20
    },
  
    results: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: 300
    },
  
    listFavorite: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20
    }
  
  });