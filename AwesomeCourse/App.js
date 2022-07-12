/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { Node } from 'react'
import UpsertTodo from './components/UpsertTodo'
import TodoList from './components/TodoList'

const Stack = createNativeStackNavigator()

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'Todo List' }} />
        <Stack.Screen name="UpsertTodo" component={UpsertTodo} options={{ title: 'New Todo' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
