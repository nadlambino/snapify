import samplePhoto from './../../assets/images/sample-profile.jpg'
import { PostType, MediaType, UserType } from "../../types/PostType"
import Media from "./Media"
import Stories from 'react-insta-stories';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

interface Props {
  post: PostType
}

export default function Post({ post }: Props ) {
  const media: [MediaType] = post.media
  const user: UserType = post.user
  const timePosted = dayjs(post.createdAt).fromNow()
  const [activeSlide, setActiveSlide] = useState(0)
  let timeout: number = 0

  const handleSlidePlay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      let slide = activeSlide < (media.length - 1) ? activeSlide + 1 : 0
      setActiveSlide(slide)
    }, 5000)
  }

  useEffect(() => {
    handleSlidePlay()
  }, [activeSlide])

  return (
    <div className='item'>
      <div className='post-details-container'>
        <div className='overlay'></div>
        <img src={samplePhoto} className='post-profile' alt="Profile Photo"/>
        <div className="flex flex-col">
          <span className='capitalized text-gray-200 relative z-10'>{`${user.firstName} ${user.lastName}`}</span>
          <small className="text-gray-300">{timePosted}</small>
        </div>
      </div>
      <div className='flex flex-wrap overflow-auto post-image-wrapper'>
        <div className='thumb-container flex bg-blue w-full gap-1 absolute top-0 z-10 p-2'>
        {
          media.map((data, index) => (
            <span 
              key={data._id} 
              className={
                'slide-thumb-item ' + 
                (index === activeSlide ? 'slide-active ' : '') +
                (index < activeSlide ? 'prev-slide' : '')}>
              </span>)
          )
        }
        </div>
        <div className='post-image-container'>
        {
          media.map((image, index) => <Media media={image} key={image._id} className={index === activeSlide ? 'flex': 'hidden'} />)
        }
        </div>
      </div>
    </div>
  )
}
