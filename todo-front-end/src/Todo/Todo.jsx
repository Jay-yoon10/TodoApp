import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  List,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const { editItem, deleteItem } = props;

  const editEventHandler = (e) => {
    setItem({ ...item, title: e.target.value });
  };

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  };
  const turnOnReadOnly = (e) => {
    if (e.key === 'Enter' && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };
  const turnOffReadOnly = () => {
    setReadOnly(false);
  };
  const deleteEventHandler = () => {
    deleteItem(item);
  };
  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ 'aria-label': 'naked', readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type='text'
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label='Delete Todo' onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
