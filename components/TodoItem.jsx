import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  TextField
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { makeStyles } from '@material-ui/core/styles'
import { useTodo } from '../context/useTodo'

const useStyles = makeStyles({
  linethrough: {
    textDecoration: 'line-through'
  }
})

export default function TodoItem({ data = {} }) {
  const classes = useStyles()
  const [editMode, setEditMode] = React.useState(false)
  const [editInput, setEditInput] = React.useState()
  const { edit, toggle, remove } = useTodo()

  const handleEdit = (id) => () => {
    edit(id, editInput)
    // console.log('handleEdit id', id)
    // console.log('handleEdit input', editInput)
    setEditMode(false)
  }

  const handleEditOnEnter = (id) => (e) => {
    if (e.key === 'Enter') {
      // console.log('handleEditOnEnter id', id)
      // console.log('handleEditOnEnter input', editInput)
      edit(id, editInput)
      setEditMode(false)
    }
  }

  const prepareEdit = () => {
    setEditMode(true)
    setEditInput(data.task)
  }

  return (
    <ListItem
      key={data.id}
      role={undefined}
      dense
      style={{ paddingRight: '100px' }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={data.done}
          tabIndex={-1}
          disableRipple
          onChange={() => toggle(data.id, !data.done)}
          disabled={editMode}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          editMode ? (
            <TextField
              fullWidth
              defaultValue={data.task}
              inputProps={{ style: { fontSize: '14px' } }}
              autoFocus
              onChange={(e) => setEditInput(e.target.value)}
              onKeyUp={handleEditOnEnter(data.id)}
            />
          ) : (
            data.task
          )
        }
        className={data.done ? classes.linethrough : ''}
      />
      <ListItemSecondaryAction>
        {editMode ? (
          <IconButton
            edge="start"
            aria-label="save"
            onClick={handleEdit(data.id)}
            disabled={data.done}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            aria-label="edit"
            onClick={prepareEdit}
            disabled={data.done}
          >
            <EditIcon />
          </IconButton>
        )}
        {editMode ? (
          <IconButton
            edge="end"
            aria-label="cancel"
            onClick={() => setEditMode(false)}
          >
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => remove(data.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}
