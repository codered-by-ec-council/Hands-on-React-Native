import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Alert, FlatList, Button, Animated, Easing } from 'react-native';
import { toggleDone } from '../feature/todo'
import { useGetTodosQuery, useDeleteTodoMutation } from '../feature/todoApi';

const TodoList = ({ navigation }) => {
  const { data: todos, error: errorTodo, isLoading: isTodosLoading } = useGetTodosQuery()
  const [deleteTodo] = useDeleteTodoMutation()
  const fadeIn = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const slideInAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        slideInAnim,
        {
          easing: Easing.in(Easing.bounce),
          useNativeDriver: true,
          toValue: 1,
          duration: 2500,
        }
      ),
      Animated.timing(
        fadeIn,
        {
          easing: Easing.in,
          useNativeDriver: true,
          toValue: 1,
          duration: 1500,
        }
      )
      ]).start();
  }, [slideInAnim])
  
  const dispatch = useDispatch()

  if (isTodosLoading) {
    return (
      <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 100}}>Wait for the magic</Text>
    )
  }

  if (errorTodo) {
    return (
      <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 100}}>Something went wrong, please reload the app</Text>
    )
  }

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ flex: 1, paddingHorizontal:20 }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Animated.View 
              key={item.id} 
              style={{
                transform: [{translateX: slideInAnim.interpolate({
                  inputRange: [0,1],
                  outputRange: [1000, 0]
                })}],
                opacity: fadeIn,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 20,
                padding: 15
              }}
            >
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  dispatch(toggleDone({ id: item.id }))
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    marginBottom: 10,
                    textDecorationLine: item.done ? 'line-through' : 'none'
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  textDecorationLine: item.done ? 'line-through' : 'none'
                }}
              >
                {item.subtitle}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  textDecorationLine: item.done ? 'line-through' : 'none'
                }}
              >
                {item.description}
              </Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Button
                  title="Edit"
                  onPress={()=>{
                    navigation.navigate('UpsertTodo', {todo: item})
                  }}
                />
                <Button
                  title="Delete"
                  color='#F00'
                  onPress={()=>{
                    Alert.alert(
                      'Are you sure?',
                      'Your todo will be deleted permantely',
                      [
                        {
                          text:'Delete',
                          onPress: () => deleteTodo({ id: item.id })
                        },
                        {
                          text:'Nevermind',
                          style: 'cancel'
                        }
                      ]
                    )
                  }}
                />
              </View>
            </Animated.View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#ccc',
          padding: 10,
          paddingBottom: 20,
        }}
        onPress={() => {
          navigation.navigate('UpsertTodo')
        }}
      >
        <Text style={{ fontSize: 25, textAlign: 'center' }}>Add task</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TodoList