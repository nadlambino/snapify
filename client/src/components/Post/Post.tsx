import samplePhoto from './../../assets/images/sample-profile.jpg'
import { PostType, MediaType } from "../../types/PostType"
import Media from "./Media"
import Stories from 'react-insta-stories';

interface Props {
  post: PostType
}

export default function Post({ post }: Props ) {
  const media: [MediaType] = post.media
  const stories = media.map(data => {
    const url = window.apiUrl + data.src.replace('public', '')
    return {
      url,
      type: data.category,
      duration: data.duration
    }
  })

  return (
    <div className='item'>
      <div className='post-details-container'>
        <img src={samplePhoto} className='post-profile' alt="Profile Photo"/>
        <div className="flex flex-col">
          <span>Alexa Botez</span>
          <small className="text-gray-400">9 minutes ago</small>
        </div>
      </div>
      <div className='flex flex-wrap overflow-auto post-image-wrapper'>
        <div className='thumb-container flex bg-blue w-full gap-1 absolute top-0 z-10 p-2'>
          {
            media.map((data) => <span key={data._id} className='bg-gray-400 rounded h-[3px] w-full'></span>)
          }
        </div>
        <div className='flex flex-wrap overflow-auto post-image-container'>
        {
          media.map(image => <Media media={image} key={image._id} />)
        }
        </div>
      </div>
    </div>
  )
}
