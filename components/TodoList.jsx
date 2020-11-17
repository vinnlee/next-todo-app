import { Box, Typography, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTodo } from '../context/useTodo'
import TodoItem from './TodoItem'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 20
  },
  progress: {
    display: 'flex',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function TodoInput() {
  const classes = useStyles()
  const { todos } = useTodo()

  if (!todos) {
    return (
      <Box className={classes.progress}>
        <CircularProgress />
      </Box>
    )
  }

  return todos.length ? (
    <Box>
      <Typography variant="overline" display="block" className={classes.title}>
        Todo List
      </Typography>
      <List>
        {todos.map((item) => (
          <TodoItem key={item.id} data={item} />
        ))}
      </List>
    </Box>
  ) : (
    <Typography
      variant="body2"
      align="center"
      style={{ margin: '35px 0 10px' }}
    >
      You don't have anything to be completed yet.
    </Typography>
  )
}
