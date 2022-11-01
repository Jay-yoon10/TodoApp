import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../service/Api_service';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');

    signIn({ email: email, password: password });
  };

  return (
    <Container component='main' maxWidth='xs' style={{ marginTop: '8%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5'>
            LogIn
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {' '}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='email'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Link to='/signup' variant='body2'>
              Please sign up here.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
