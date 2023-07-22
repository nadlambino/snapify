import { PostType, MediaType, UserType } from "../../types/PostType"
import Media from "./Media"
import { useState, useRef } from 'react'
import dayjs from 'dayjs';
import { Avatar } from '@mui/material'
import './../../css/post.css'
import Actions from "./Actions";

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
  const containerRef = useRef<HTMLDivElement>(null)

  const playCallback = (duration: number) => {
    
  }

  const pauseCallback = (paused: Boolean) => {

  }

  const endedCallback = (index: number) => {
    if (media.length === 1) {
      return
    }

    const slideIndex = (media.length - 1) === index ? 0 : index + 1
    setActiveSlide(slideIndex)
  }

  return (
    <div className="item">
      <div className='post-details-container'>
        <div className='overlay-top'></div>
        <Avatar alt={fullName} sx={{ bgcolor: '#2A2F4F', fontSize: '14px' }}>{initials}</Avatar>
        <div className="flex flex-col">
          <span className='fullname'>{fullName}</span>
          <small className="time-posted">{timePosted}</small>
        </div>
      </div>
      <div className='post-image-wrapper' ref={containerRef}>
        <div className='thumb-container'>
        {
          media.length > 0 && media.map((data, index) => (
              <span 
                key={data._id} 
                className={`slide-thumb-item ${index === activeSlide ? 'slide-active' : ''} ${index < activeSlide ? 'slide-prev' : ''}`}>
                  <span className={"slide-animation"} ></span>
              </span>
          ))
        }
        </div>
        <div className='post-image-container'>
        {
          media.map((image, index) => (
            <Media 
              media={image} 
              key={index} 
              index={index}
              active={index === activeSlide}
              className={index === activeSlide ? 'flex': 'hidden'} 
              playCallback={playCallback}
              pauseCallback={pauseCallback}
              endedCallback={endedCallback}
            />
          ))
        }
        </div>
        <Actions post={post} />
        {
          post.content && 
          <div className='post-content-container'>
            <div className='overlay-bottom'></div>
            <span className='text-white'>{post.content}</span>
          </div>
        }
      </div>
    </div>
  )
}
