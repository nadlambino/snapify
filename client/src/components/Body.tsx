import { Grid } from '@mui/material'
import Feed from './Post/Feed'

export default function Body() {
  return (
    <Grid container item xs={12} sm={7} md={5} lg={4} className='body has-header'>
      <Feed />
    </Grid>
  )
}