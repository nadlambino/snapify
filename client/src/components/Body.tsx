import { Grid, Typography } from '@mui/material'
import Feed from './Post/Feed'

export default function Body() {
  return (
    <Grid container justifyContent="center">
      <Grid item container xs={12} md={6} margin={3}>
        <Feed />
      </Grid>
    </Grid>
  )
}