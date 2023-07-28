import {
  Grid,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { FormEvent, useState, useEffect } from 'react';
import { SignUpData, signUp } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { setAuth } from './../../store/modules/auth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Any } from '../../types';
import { useMutation } from 'react-query';

export default function SignUp(props: React.PropsWithChildren<Any>) {
  const [form, setForm] = useState<SignUpData>({
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    password: null,
    confirm: null,
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const dispatch = useDispatch();
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess, isError, data, error } = useMutation({
    mutationFn: (form: SignUpData) => {
      return signUp(form);
    },
  });

  useEffect(() => {
    if (!isLoading && isError && error) {
      setErrorMessage('Failed to sign up. Please try again later');
    }
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
    setErrorMessage('');

    if (form.password !== form.confirm) {
      setErrorMessage('Password do not match');
      return;
    }

    mutate(form);
  };

  return (
    <div className="w-full flex flex-col justify-center py-2">
      <form onSubmit={handleSignUp}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          gap={2}
        >
          {errorMessage && (
            <Grid
              item
              xs={12}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              variant="outlined"
              label="First Name"
              fullWidth
              onChange={(e) => handleFormChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              variant="outlined"
              label="Last Name"
              fullWidth
              onChange={(e) => handleFormChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl required>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                onChange={(e) => handleFormChange('gender', e.target.value)}
                row
                aria-labelledby="gender"
                name="gender-group"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              required
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
              required
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
            <TextField
              required
              variant="outlined"
              label="Confirm Password"
              type="password"
              fullWidth
              onChange={(e) => handleFormChange('confirm', e.target.value)}
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
              Sign Up
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
