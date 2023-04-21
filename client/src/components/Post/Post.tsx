import { PostType, MediaType, UserType } from "../../types/PostType"
import Media from "./Media"
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Avatar } from '@mui/material'
import './../../css/post.css'
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comments from "./Comments";

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
  const [showComments, setShowComments] = useState(false)

  const handleSlidePlay = () => {
    if (media.length <= 1) {
      return
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      let slide = activeSlide < (media.length - 1) ? activeSlide + 1 : 0
      setActiveSlide(slide)
    }, 5000)
  }

  const handleShowComments = () => {
    setShowComments(true)
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
      <div className='post-image-wrapper'>
        <div className='thumb-container'>
        {
          media.length > 1 && media.map((data, index) => (
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
          media.map((image, index) => (
            <Media 
              media={image} 
              key={image._id} 
              className={index === activeSlide ? 'flex': 'hidden'} 
            />
          ))
        }
        </div>
        <div className="post-buttons-container">
          <button className="p-2">
            <FavoriteIcon className="text-gray-300" fontSize="large" />
          </button>
          <button className="p-2" onClick={handleShowComments}>
            <ModeCommentIcon className="text-gray-300" fontSize="large" />
          </button>
        </div>
        {
          post.content && 
          <div className='post-content-container'>
            <div className='overlay-bottom'></div>
            <span className='text-white'>{post.content}</span>
          </div>
        }
      </div>
      <Comments 
        show={showComments} 
        setShowComment={setShowComments} 
        postId={post._id}
        comments={post.comments}
      />
    </div>
  )
}
