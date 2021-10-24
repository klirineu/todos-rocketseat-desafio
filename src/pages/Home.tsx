import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExist = tasks.find(task => task.title === newTaskTitle)
  
    if(taskAlreadyExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "OK", onPress: () => console.log("OK Pressed")
          }
        ]
      )
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks(oldState => [...oldState, data])
    }

  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }))
    
    const foundItem = updateTasks.find(item => item.id === id)

    if(!foundItem) {
      return
    }

    foundItem. done = !foundItem.done
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não", onPress: () => console.log("Não Pressed")
        },
        {
          text: "Sim", onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
        }
      ]
    )
    
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updateTasks.find(item => item.id === taskId)

    if(!taskToBeUpdated) {
      return
    }

    taskToBeUpdated. title = taskNewTitle
    setTasks(updateTasks)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})