import React from 'react'
import firebase from '../firebase'
import { useUser } from './useUser'

const TodoContext = React.createContext()

export default function TodoProvider({ children }) {
  const [todos, setTodo] = React.useState()
  const [loadingTodos, setLoadingTodos] = React.useState(true)
  const { user } = useUser()

  const add = async (task) => {
    await firebase.firestore().collection('todos').add({
      task,
      done: false,
      uid: firebase.auth().currentUser.uid,
      createdDate: firebase.firestore.Timestamp.now()
    })
  }

  const edit = async (id, newName) => {
    await firebase.firestore().collection('todos').doc(id).update({
      task: newName
    })
  }

  const toggle = async (id, state) => {
    await firebase.firestore().collection('todos').doc(id).update({
      done: state
    })
  }

  const remove = async (id) => {
    await firebase.firestore().collection('todos').doc(id).delete()
  }

  React.useEffect(() => {
    if (!user) return

    const unsubscriber = firebase
      .firestore()
      .collection('todos')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .orderBy('createdDate')
      .onSnapshot((snapshot) => {
        const dataList = snapshot.docs.map((doc) => {
          const docData = doc.data()
          return {
            id: doc.id,
            task: docData.task,
            done: docData.done
          }
        })
        setTodo(dataList)
        setLoadingTodos(false)
      })

    return () => unsubscriber()
  }, [user])

  return (
    <TodoContext.Provider
      value={{ todos, loadingTodos, add, edit, toggle, remove }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => React.useContext(TodoContext)
