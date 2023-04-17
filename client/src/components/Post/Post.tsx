import { Grid } from "@mui/material"
import samplePhoto from './../../assets/images/sample-profile.jpg'
import PostType from "../../types/PostType"

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
      <div className='post-image-container'>
        {
          media.map(image => {
            const src = window.apiUrl + '/' + image.src.replace('public\\', '')
            return <img src={src} className='post-image' alt="Post Photo" />
          })
        }
      </div>
    </Grid>
  )
}
