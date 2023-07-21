import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { setAuth } from './../../store/modules/auth'
import { Grid, TextField, Button, Typography } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'
import { signIn } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

type Form = {
  email: string | null, 
  password: string | null
}

export default function SignIn(props: UnstrictReactPropType) {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies()
  const [error, setError] = useState<String>()

  const [form, setForm] = useState<Form>({
    email: null,
    password: null
  })

  const dispatch = useDispatch()

  const handleFormChange = (key: string, value: string | null) => {
    setForm((prevState) => ({...prevState, [key]: value}))
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    signInUser(form)
  }

  const handleSignInDemo = () => {
    signInUser({ email: 'johndoe@test.com', password: 'password'})
  }

  const signInUser = async (form : Form) => {
    const user = await signIn(form)

    if (!user) {
      setError('Failed to login. Please check your credentials.')
      return
    }

    dispatch(setAuth(user))
    setCookie('token', user.access.token, {expires: new Date(user.access.expiration)})
    setCookie('user', user.user, {expires: new Date(user.access.expiration)})
    navigate('/')
  }

  return (
    <div className='w-full flex flex-col justify-center'>
      <form onSubmit={handleSignUp}>
        <Grid container justifyContent="center" direction="column" gap={2}>
          <Grid item xs={12}>
            <Typography textAlign="center" className="text-gray-500">{error}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Email" type="email" fullWidth onChange={(e) => handleFormChange('email', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Password" type="password" fullWidth onChange={(e) => handleFormChange('password', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth className="btn bg-primary" type="submit">Sign In</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth className="btn bg-secondary" type="button" onClick={handleSignInDemo}>Sign In as Demo</Button>
          </Grid>
          <Grid item xs={12}>
            {props.children && props.children}
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
