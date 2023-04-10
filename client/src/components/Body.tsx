import { Grid, Typography } from '@mui/material'
import Feed from './Post/Feed'
import Moods from './Mood/Moods'

export default function Body() {
  return (
    <Grid container justifyContent="center">
      <Grid item container xs={12} md={6} padding={1}>
        <Moods />
        <Feed />
      </Grid>
    </Grid>
  )
}