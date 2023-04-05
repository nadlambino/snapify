import { Grid, TextField, Button, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'

export default function SignUp(props: UnstrictReactPropType) {
  return (
    <Grid item xs={3}>
      <Grid container justifyContent="center" direction="column" padding={5} gap={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="First Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Last Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
        <FormControl>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender"
            defaultValue="male"
            name="gender-group">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Email" type="email" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Password" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Confirm Password" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth className="btn">Sign Up</Button>
        </Grid>
        <Grid item xs={12}>
          {props.children && props.children}
        </Grid>
      </Grid>
    </Grid>
  )
}
