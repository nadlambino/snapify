import { Grid } from "@mui/material"
import samplePhoto from './../../assets/images/sample-profile.jpg'
import PostType from "../../types/PostType"
import Media from "./Media"

interface Props {
  post: PostType
}

export default function Post({ post }: Props ) {
  const { media } = post

  return (
    <Grid item className='item'>
      <div className='post-details-container'>
        <img src={samplePhoto} className='post-profile' alt="Profile Photo"/>
        <div className="flex flex-col">
          <span>Alexa Botez</span>
          <small className="text-gray-400">9 minutes ago</small>
        </div>
      </div>
      <div className="flex flex-wrap overflow-auto post-image-wrapper">
      {
        media.map(image => <Media media={image} key={image._id} />)
      }
      </div>
    </Grid>
  )
}
