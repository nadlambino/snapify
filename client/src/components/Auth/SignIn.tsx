import { Grid, TextField, Button } from '@mui/material'
import UnstrictReactPropType from '../../types/UnstrictReactPropType'

export default function SignIn(props: UnstrictReactPropType) {
  return (
    <Grid item xs={3}>
      <Grid container justifyContent="center" direction="column" padding={5} gap={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Email" type="email" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Password" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth className="btn">Sign In</Button>
        </Grid>
        <Grid item xs={12}>
          {props.children && props.children}
        </Grid>
      </Grid>
    </Grid>
  )
}
