import React from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { signup } from '../service/Api_service';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = '/login';
      }
    );
  };

  return (
    <Container component='main' maxWidth='xs' style={{ marginTop: '8%' }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h5'>
              Create an Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete='email'
              name='email'
              variant='outlined'
              required
              fullWidth
              id='email'
              label='email'
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete='fname'
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Id'
              autoFocus
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
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link to='/login' variant='body2'>
              Already have an account? Please sign-in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
