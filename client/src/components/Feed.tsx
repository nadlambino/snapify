import { Grid, Typography } from '@mui/material'

export default function Feed() {
  return (
    <Grid container justifyContent="center">
      <Grid item container xs={12} md={8} margin={3}>
        <Typography variant="h5">Hello World</Typography>
      </Grid>
    </Grid>
  )
}