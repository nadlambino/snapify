import { Grid } from "@mui/material"
import samplePhoto from './../../assets/images/sample-profile.jpg'
import samplePost from './../../assets/images/sample-post.jpg'

export default function Post() {

  return (
    <Grid item className='item'>
      <div className='post-details-container'>
        <img src={samplePhoto} className='post-profile' alt="Profile Photo"/>
        <div className="flex flex-col">
          <span>Alexa Botez</span>
          <small className="text-gray-400">9 minutes ago</small>
        </div>
      </div>
      <div className='post-image-container'>
        <img src={samplePost} className='post-image' alt="Post Photo" />
      </div>
    </Grid>
  )
}
