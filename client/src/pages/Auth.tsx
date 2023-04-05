import Footer from "../components/Footer"
import Header from "../components/Header"
import {Grid, TextField, Button} from '@mui/material'

function Auth() {
  return (
    <div className="App">
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={3}>
          <Grid container justifyContent="center" direction="column" margin={5} gap={3}>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth className="btn">Sign In</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default Auth