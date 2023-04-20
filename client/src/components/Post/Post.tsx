import { PostType, MediaType, UserType } from "../../types/PostType"
import Media from "./Media"
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Avatar } from '@mui/material'
import './../../css/post.css'

interface Props {
  post: PostType
}

export default function Post({ post }: Props ) {
  const media: [MediaType] = post.media
  const user: UserType = post.user
  const fullName = `${user.firstName} ${user.lastName}`
  const initials = `${user.firstName[0]}${user.lastName[0]}`
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
        <div className='overlay-top'></div>
        <Avatar alt={fullName} sx={{ bgcolor: '#2A2F4F', fontSize: '14px' }}>{initials}</Avatar>
        <div className="flex flex-col">
          <span className='capitalized text-gray-200 relative z-10'>{fullName}</span>
          <small className="text-gray-300">{timePosted}</small>
        </div>
      </div>
      <div className='flex flex-col h-full relative'>
        <div className='thumb-container flex bg-blue w-full gap-1 absolute top-0 z-10 p-2'>
        {
          media.map((data, index) => (
            <span 
              key={data._id} 
              className={
                'slide-thumb-item ' + 
                (index === activeSlide ? 'slide-active ' : '') +
                (index < activeSlide ? 'slide-prev' : '')}>
              </span>)
          )
        }
        </div>
        <div className='post-image-container'>
        {
          media.map((image, index) => <Media media={image} key={image._id} className={index === activeSlide ? 'flex': 'hidden'} />)
        }
        </div>
        <div className='absolute bottom-0 p-3 py-6 w-full'>
          <div className='overlay-bottom'></div>
          <span className='text-white'>{post.content}</span>
        </div>
      </div>
    </div>
  )
}
