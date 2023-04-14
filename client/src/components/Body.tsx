import { Grid } from '@mui/material'
import Moods from './Mood/Moods'
import Feed from './Post/Feed'

export default function Body() {
  return (
    <Grid item margin="auto" container justifyContent="center" direction='column' xs={12} md={4} className='body'>
      <Grid item container xs={12} md={4} padding={1} gap={2}>
        <Moods />
        <Feed />
      </Grid>
    </Grid>
  )
}