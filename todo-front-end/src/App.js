import './App.css';
import Todo from './Todo/Todo';
import { useState, useEffect } from 'react';
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddTodo from './Todo/AddTodo';
import { call, signout } from './service/Api_service';
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    call('/todo', 'GET', null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  const addItem = (item) => {
    call('/todo', 'POST', item).then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call('/todo', 'PUT', item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call('/todo', 'DELETE', item).then((response) => setItems(response.data));
  };
  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );

  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent='space-between' container>
          <Grid item>
            <Typography variant='h6'>Todo List</Typography>
          </Grid>
          <Grid item>
            <Button color='inherit' raised onClick={signout}>
              Sign Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth='md'>
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
  let loadingPage = <h1> Loading.. </h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }
  return <div className='App'>{content}</div>;
}

export default App;
