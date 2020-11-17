import TextField from '@material-ui/core/TextField'
import { useTodo } from '../context/useTodo'

export default function TodoInput() {
  const [task, setTask] = React.useState('')
  const { add } = useTodo()

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      add(task)
      setTask('')
    }
  }

  return (
    <TextField
      label="What needs to be done?"
      placeholder="Type and press enter."
      fullWidth
      value={task}
      onKeyUp={handleInput}
      onChange={(e) => setTask(e.target.value)}
    />
  )
}
