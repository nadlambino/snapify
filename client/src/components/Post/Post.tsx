import { PostType, MediaType, UserType } from "../../types/PostType"
import Media from "./Media"
import { useEffect, useState, useRef } from 'react'
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
  let timeout: any = 0
  const animationThumbRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSlidePlay = () => {
    clearTimeout(timeout)
    if (media.length <= 1) {
      return
    }
    timeout = setTimeout(() => {
      let slide = activeSlide < (media.length - 1) ? activeSlide + 1 : 0
      setActiveSlide(slide)
    }, 5000)
  }

  const pauseCallback = (paused: Boolean) => {
    if (animationThumbRef.current) {
      if (paused) {
        animationThumbRef.current.style.animationPlayState = 'paused'
      } else {
        animationThumbRef.current.style.animationPlayState = 'running'
      }
    }
  }

  useEffect(() => {
    handleSlidePlay()
  }, [activeSlide])

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
          media.length > 1 && media.map((data, index) => (
            <span 
              key={data._id} 
              className={
              'slide-thumb-item ' + 
              (index === activeSlide ? 'slide-active ' : '') +
              (index < activeSlide ? 'slide-prev' : '')}>
                <span ref={animationThumbRef} className={"slide-animation " + (index === activeSlide ? 'active ' : '')} ></span>
            </span>)
          )
        }
        </div>
        <div className='post-image-container'>
        {
          media.map((image, index) => (
            <Media 
              media={image} 
              key={image._id} 
              active={index === activeSlide}
              className={index === activeSlide ? 'flex': 'hidden'} 
              pauseCallback={pauseCallback}
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
