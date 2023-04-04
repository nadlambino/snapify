import { Grid, Typography } from '@mui/material'

export default function Feed() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8} margin={3}>
        <Typography variant="h5">Hello World</Typography>
      </Grid>
    </Grid>
  )
}