import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Easing } from 'react-native';
import { useUpsertTodoMutation } from '../feature/todoApi';

const emtpyTodo = {
  title: '',
  subtitle: '',
  description: '',
}

const UpsertTodo = ({ route, navigation }) => {
  const {todo} = route.params || { todo: emtpyTodo }
  const isEditing = todo.id !== undefined

  const [title, setTitle] = useState(todo.title)
  const [subtitle, setSubtitle] = useState(todo.subtitle)
  const [description, setDescription] = useState(todo.description)
  const [updatePost, result] = useUpsertTodoMutation()

  const descriptionCharactersLeft = 200 - description.length
  const isDescriptionValid = descriptionCharactersLeft >= 0

  const fadeInTitle = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const fadeInSubtitle = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const fadeInDescription = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const scaleIn = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  
  useEffect(() => {
      Animated.timing(
        scaleIn,
        {
          easing: Easing.in(Easing.bounce),
          useNativeDriver: true,
          toValue: 1,
          duration: 800,
        }
      ).start();

      Animated.timing(
        fadeInTitle,
        {
          easing: Easing.in,
          useNativeDriver: true,
          toValue: 1,
          duration: 800,
        }
      ).start();

      Animated.timing(
        fadeInSubtitle,
        {
          easing: Easing.in,
          delay: 200,
          useNativeDriver: true,
          toValue: 1,
          duration: 800,
        }
      ).start();

      Animated.timing(
        fadeInDescription,
        {
          easing: Easing.in,
          delay: 400,
          useNativeDriver: true,
          toValue: 1,
          duration: 800,
        }
      ).start();
  }, [fadeInTitle, fadeInSubtitle, fadeInDescription, scaleIn])

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flex: 1 }}>
        <Animated.Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            transform: [{
              scale: scaleIn
            }]
          }}>
            What's yout task?
        </Animated.Text>
        <View style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
          <Animated.View
            style={{
              marginBottom: 20,
              opacity: fadeInTitle,
            }}
          >
            <TextInput
              value={title}
              placeholder="Title"
              style={{
                fontSize: 26,
                borderBottomColor: '#ccc',
                borderBottomWidth: 2
              }}
              onChangeText={setTitle}
            />
          </Animated.View>
          <Animated.View
            style={{
              marginBottom: 20,
              opacity: fadeInSubtitle,
            }}
          >
            <TextInput
              value={subtitle}
              placeholder="Subtitle"
              style={{
                fontSize: 26,
                borderBottomColor: '#ccc',
                borderBottomWidth: 2
              }}
              onChangeText={setSubtitle}
            />
          </Animated.View>
          <Animated.View
            style={{
              marginBottom: 20,
              opacity: fadeInDescription,
            }}
          >
            <Text style={{textAlign: 'right', color: isDescriptionValid ? '#00F': '#F00'}}>
              {descriptionCharactersLeft}
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={description}
              placeholder="Description"
              style={{
                fontSize: 26,
                borderBottomColor: '#ccc',
                borderBottomWidth: 2
              }}
              onChangeText={setDescription}
            />
            {
              !isDescriptionValid && (
                <Text style={{textAlign: 'right', color:'#F00'}}>Description too long</Text>
              )
            }
          </Animated.View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#ccc',
          padding: 10,
          paddingBottom: 20,
        }}
        onPress={() => {
          if (!isDescriptionValid) {
            return
          }

          // I'm editing the todo
          if (isEditing) {
            updatePost({
              id: todo.id,
              title,
              subtitle,
              description
            })
            navigation.goBack()
            return
          }

          // I'm creating the todo
          if (title) {
            updatePost({
              title,
              subtitle,
              description
            })
            navigation.goBack()
            return
          }

          // Nothing to do, just go back
          navigation.goBack()
        }}
      >
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          {!isEditing && title && 'Create task'}
          {!isEditing && !title  && 'Go back'}
          {isEditing && 'Update task'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UpsertTodo