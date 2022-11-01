import { Paper, Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';

const AddTodo = ({ addItem }) => {
  const [item, setItem] = useState({ title: '' });

  const onButtonClick = () => {
    addItem(item);
    setItem({ title: '' });
  };
  const onInputChange = (e) => {
    setItem({ title: e.target.value });
    console.log(item);
  };
  const returnKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder='Add Todo Here'
            fullWidth
            onChange={onInputChange}
            value={item.title}
            onKeyPress={returnKeyEventHandler}
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            fullWidth
            color='secondary'
            variant='outlined'
            onClick={onButtonClick}
          >
            {' '}
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
