import Header from '../components/Header'
import Footer from '../components/Footer'
import { Grid, Typography } from '@mui/material'

export default function PageNotFound() {
  return (
    <div className="app">
      <Grid container justifyContent="center" alignItems="center" position="fixed" height="calc(100vh - 56px)">
        <Grid item xs={12} textAlign="center">
          <Typography variant="h5">The page you are trying to visit might be broken or not existing</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
