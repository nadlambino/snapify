import { Grid } from '@mui/material'
import Moods from './Mood/Moods'
import Feed from './Post/Feed'

export default function Body() {
  return (
    <Grid container item xs={12} sm={7} md={5} lg={4} className='body'>
      <Feed />
    </Grid>
  )
}