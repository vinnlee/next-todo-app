import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import TodoProvider from '../context/useTodo'
import Layout from '../components/Layout'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import { useUser } from '../context/useUser'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: `${theme.spacing(8)}px auto 0`,
    padding: '15px'
  }
}))

export default function Dashboard() {
  const classes = useStyles()
  const router = useRouter()
  const { user, loadingUser } = useUser()

  React.useEffect(() => {
    if (!user && !loadingUser) {
      router.push('/login')
    }
  }, [user, loadingUser])

  return (
    user && (
      <Layout title="Todo List">
        <Card className={classes.card}>
          <TodoProvider>
            <TodoInput></TodoInput>
            <TodoList></TodoList>
          </TodoProvider>
        </Card>
      </Layout>
    )
  )
}
