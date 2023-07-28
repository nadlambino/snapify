import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setAuth } from './../../store/modules/auth';
import { Grid, TextField, Button, Typography, Alert } from '@mui/material';
import { SignInData, signIn } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Any } from '../../types';
import { useMutation } from 'react-query';

export default function SignIn(props: React.PropsWithChildren<Any>) {
  const navigate = useNavigate();
  const [_, setCookie] = useCookies();
  const dispatch = useDispatch();
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation({
    mutationFn: (form: SignInData) => signIn(form),
  });

  const [form, setForm] = useState<SignInData>({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      dispatch(setAuth(data));
      setCookie('token', data.access.token, {
        expires: new Date(data.access.expiration),
      });
      setCookie('user', data.user, {
        expires: new Date(data.access.expiration),
      });
      navigate('/');
    }
  }, [data, isSuccess, isLoading]);

  const handleFormChange = (key: string, value: string | null) => {
    setForm((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  const handleSignInDemo = () => {
    mutate({ email: 'johndoe@test.com', password: 'password' });
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <form onSubmit={handleSignUp}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          gap={2}
        >
          {isError && (
            <Grid
              item
              xs={12}
            >
              <Alert severity="error">
                Failed to sign in. Please check your credentials
              </Alert>
            </Grid>
          )}
          <Grid
            item
            xs={12}
          >
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => handleFormChange('email', e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => handleFormChange('password', e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              variant="contained"
              fullWidth
              className="btn bg-primary"
              type="submit"
            >
              Sign In
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              variant="contained"
              fullWidth
              className="btn bg-secondary"
              type="button"
              onClick={handleSignInDemo}
            >
              Sign In as Demo
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
          >
            {props.children && props.children}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
