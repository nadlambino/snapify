import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { setAuth } from './../../store/modules/auth'
import { Grid, TextField, Button } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'
import { signIn } from '../../api/auth'

export default function SignIn(props: UnstrictReactPropType) {
  const auth = useSelector((state: any) => state.auth)
  const [cookies, setCookie] = useCookies(['token'])

  const [form, setForm] = useState<{email: string | null, password: string | null}>({
    email: null,
    password: null
  })

  const dispatch = useDispatch()

  const handleFormChange = (key: string, value: string | null) => {
    setForm((prevState) => ({...prevState, [key]: value}))
  }

  const handleSignUp = async () => {
    const user = await signIn(form)

    if (user) {
      dispatch(setAuth(user))
      setCookie('token', user.access.token, {expires: new Date(user.access.expiration)})
    }
  }

  return (
    <Grid item xs={3}>
      <Grid container justifyContent="center" direction="column" padding={5} gap={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Email" type="email" fullWidth onChange={(e) => handleFormChange('email', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Password" type="password" fullWidth onChange={(e) => handleFormChange('password', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth className="btn" onClick={handleSignUp}>Sign In</Button>
        </Grid>
        <Grid item xs={12}>
          {props.children && props.children}
        </Grid>
      </Grid>
    </Grid>
  )
}
