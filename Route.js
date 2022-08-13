import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaFilmes from './components/componentsProntos/ListaFilmes';
import DadosFilmes from './components/componentsProntos/DadosFilmes';

const Stack = createNativeStackNavigator()

export default function Route() {
  return (
    <NavigationContainer initialRouteName="ListaFilmes">
        <Stack.Navigator>
            <Stack.Screen name='ListaFilmes' component={ListaFilmes} />
            <Stack.Screen name='DadosFilmes' component={DadosFilmes} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}