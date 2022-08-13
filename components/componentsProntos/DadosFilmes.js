import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, ToastAndroid} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function DadosFilmes(dadosFilme) {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dadosFilme.route.params.dadosFilme.data)
    })
    console.log(dadosFilme.route.params.dadosFilme.data);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.Title}</Text>
            <Image style={styles.stretch} source={{ uri: data.Poster }} />
            <Text style={styles.information}>{data.Plot}</Text>
            <View style={styles.data_movies}>
                <View>
                    <Text style={styles.data_movies_text}>{`Released: ${data.Released}`}</Text>
                    <Text style={styles.data_movies_text}>{`Runtime: ${data.Runtime}`}</Text>
                    <Text style={styles.data_movies_text}>{`Title: ${data.Title}`}</Text>
                    <Text style={styles.data_movies_text}>{`Genre: ${data.Genre}`}</Text>
                    <Text style={styles.data_movies_text}>{`Awards: ${data.Awards}`}</Text>
                    <Text style={styles.data_movies_text}>{`Country: ${data.Country}`}</Text>
                    <Text style={styles.data_movies_text}>{`Director: ${data.Director}`}</Text>
                    <Text style={styles.data_movies_text}>{`Language: ${data.Language}`}</Text>
                    <Text style={styles.data_movies_text}>{`Metascore: ${data.Metascore}`}</Text>
                    <Text style={styles.data_movies_text}>{`Actors: ${data.Actors}`}</Text>
                </View>
            </View>
            <MaterialIcons
                    name='favorite'
                    size={24}
                    color='red'
                    onPress={() => {
                      handleWriteFavorite(item)
                      showToastWithGravity(item.Title)
                    }}
                  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        marginTop: 20,
        backgroundColor: '#000'
    },
    title: {
        fontSize: 40,
        color: '#fff'
    },
    stretch: {
        marginTop: 20,
        width: 300,
        height: 300,
        resizeMode: 'stretch',
    },
    information: {
        marginTop: 20,
        marginHorizontal: 20,
        textAlign: 'justify',
        color: '#fff'
    },
    data_movies: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        color: '#fff'
    },
    data_movies_text: {
        color: '#fff',
        flexWrap: 'wrap',
        width: 350
    }

})