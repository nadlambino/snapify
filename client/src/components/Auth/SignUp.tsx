import { Grid, TextField, Button, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Typography } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'
import { FormEvent, useState } from 'react'
import { SignUpData, signUp } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { setAuth } from './../../store/modules/auth'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


export default function SignUp(props: UnstrictReactPropType) {
  const [form, setForm] = useState<SignUpData>({
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    password: null,
    confirm: null
  })

  const [error, setError] = useState<String>()

  const dispatch = useDispatch()
  const [_, setCookie] = useCookies()
  const navigate = useNavigate()

  const handleFormChange = (key: string, value: string | null) => {
    setForm((prevState) => ({...prevState, [key]: value}))
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Password do not match')
      return
    }

    const user = await signUp(form)

    if (!user) {
      setError('Something went wrong. Please try again.')
      return
    }

    dispatch(setAuth(user))
    setCookie('token', user.access.token, {expires: new Date(user.access.expiration)})
    setCookie('user', user.user, {expires: new Date(user.access.expiration)})
    navigate('/')
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <form onSubmit={handleSignUp}>
        <Grid container justifyContent="center" direction="column" gap={2}>
          <Grid item xs={12}>
            <Typography textAlign="center" className="text-gray-500">{error}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField required variant="outlined" label="First Name" fullWidth onChange={(e) => handleFormChange('firstName', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField required variant="outlined" label="Last Name" fullWidth onChange={(e) => handleFormChange('lastName', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
          <FormControl required>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              onChange={(e) => handleFormChange('gender', e.target.value)}
              row
              aria-labelledby="gender"
              name="gender-group">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField required variant="outlined" label="Email" type="email" fullWidth onChange={(e) => handleFormChange('email', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField required variant="outlined" label="Password" type="password" fullWidth onChange={(e) => handleFormChange('password', e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField required variant="outlined" label="Confirm Password" type="password" fullWidth onChange={(e) => handleFormChange('confirm', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth className="btn bg-primary" type="submit" >Sign Up</Button>
          </Grid>
          <Grid item xs={12}>
            {props.children && props.children}
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
