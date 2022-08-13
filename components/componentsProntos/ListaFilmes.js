import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import Input from '../TextInput'
import Button from '../Button'
import ListFavorite from '../componentsProntos/ListFavorite'
import { MaterialIcons, Ionicons, Fontisto } from '@expo/vector-icons'
import axios from 'axios'

export default function ListaFilmes({navigation}) {
  const [buscaTitulo, setBuscaTitulo] = useState('')
  const [list, setList] = useState([])
  const [resultBusca, setResultBusca] = useState('')
  const [showFavorite, setShowFavorite] = useState(false)

  const defaultMovies = `http://www.omdbapi.com/?s=abc&apikey=ad83620e`
  const handleBusca = async () => {
    if (buscaTitulo === '') {
      setResultBusca('')
      startMovies()
    } else {
      const result = (
        await axios.get(
          `http://www.omdbapi.com/?s=${buscaTitulo}&apikey=ad83620e`
        )
      ).data.Search
      setResultBusca(result.length)
      setList(result)
    }
  }

  const startMovies = async () => {
    const result = (await axios.get(defaultMovies)).data.Search
    setList(result)
    setResultBusca('')
  }

  useEffect(() => {
    startMovies()
  }, [])

  console.log(list)
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('fav')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.log({ e })
    }
  }

  const handleWriteFavorite = async (item) => {
    try {
      const data = await getData()

      const fav = data.find(id => id.imdbID === item.imdbID)
      if(fav){
        return alert('Filme ja está marcado como favorito!')
      }

      let newData =
        data === null ? (newData = [item]) : (newData = [...data, item])

      await AsyncStorage.setItem('fav', JSON.stringify(newData))
    } catch (e) {
      console.log({ e })
    }
  }

  const showToastWithGravity = (title) => {
    ToastAndroid.showWithGravity(
      `O filme ${title} foi incluido na lista de favoritos!`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const handleDados = async (id) => {
    const dadosFilme = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=ad83620e`)
    navigation.navigate('DadosFilmes',{dadosFilme})
  }

  if (showFavorite) {
    return <ListFavorite list={[]} setShowFvorite={setShowFavorite} />
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style='light' />
        <View style={styles.viewBusca}>
          <Input
            style={styles.input}
            value={buscaTitulo}
            handleOnChange={(e) => setBuscaTitulo(e)}
          />
          <Button nameBtn='Buscar' handleOnPress={handleBusca} />
        </View>
        <View style={styles.results}>
          {resultBusca !== '' && (
            <Text
              style={styles.resultBusca}
            >{`${resultBusca} resultados encontrados`}</Text>
          )}
          <Fontisto
            name='favorite'
            size={24}
            color='#fff'
            style={styles.listFavorite}
            onPress={() => setShowFavorite(true)}
          />
        </View>
        <ScrollView style={styles.viewImage}>
          {list.map((item, index) => {

            return (
              <View style={styles.viewData} key={index}>
                <Image style={styles.stretch} source={{ uri: item.Poster }} />
                <View style={styles.viewFav}>
                 
                  <MaterialIcons
                    name='favorite'
                    size={24}
                    color='red'
                    onPress={() => {
                      handleWriteFavorite(item)
                      showToastWithGravity(item.Title)
                    }}
                  />
                  {/* <MaterialIcons name="favorite-outline" 
                  size={24} 
                  color="white" 
                  /> */}
                  <Text
                    style={styles.title}
                    key={index}
                    onPress={() =>
                      alert('Ir para outra tela mostrando os dados do filme')
                    }
                  >
                    {item.Title}
                  </Text>
                  <Ionicons
                    name='md-information-circle-sharp'
                    size={24}
                    color='#fff'
                    style={styles.information}
                    onPress={() => handleDados(item.imdbID)}
                  />
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
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
    marginTop: 50,
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
    maxWidth: 300,
  },

  viewFav: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  results: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 300,
  },

  listFavorite: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
})
