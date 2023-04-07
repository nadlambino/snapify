import { Grid, TextField, Button, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'
import { useState } from 'react'
import { signUp } from '../../api/auth'

interface IUserForm {
  firstName: string | null,
  lastName: string | null,
  gender: 'male' | 'female' | 'other' | null,
  email: string | null,
  password: string | null,
  confirm: string | null
}

export default function SignUp(props: UnstrictReactPropType) {
  const [form, setForm] = useState<IUserForm>({
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    password: null,
    confirm: null
  })

  const handleFormChange = (key: string, value: string | null) => {
    setForm((prevState) => ({...prevState, [key]: value}))
  }

  const handleSignUp = async () => {
    const user = await signUp(form)
    console.log(user)
  }

  return (
    <Grid item xs={3}>
      <Grid container justifyContent="center" direction="column" padding={5} gap={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="First Name" fullWidth onChange={(e) => handleFormChange('firstName', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Last Name" fullWidth onChange={(e) => handleFormChange('lastName', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <FormControl>
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
          <TextField variant="outlined" label="Email" type="email" fullWidth onChange={(e) => handleFormChange('email', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Password" type="password" fullWidth onChange={(e) => handleFormChange('password', e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Confirm Password" type="password" fullWidth onChange={(e) => handleFormChange('confirm', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth className="btn" onClick={handleSignUp} >Sign Up</Button>
        </Grid>
        <Grid item xs={12}>
          {props.children && props.children}
        </Grid>
      </Grid>
    </Grid>
  )
}
