
import './../../css/comments.css'
import { Backdrop } from '@mui/material'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import CommentForm from './CommentForm';

interface Props {
  show: boolean, 
  setShowComment: Function,
  postId: string
}

export default function Comments({ show, setShowComment, postId }: Props) {
  const [open, setOpen] = useState(show);
  const [slide, setSlide] = useState(false)
  const handleClose = () => {
    setShowComment(false)
  };

  useEffect(() => {
    setOpen(show)
    setSlide(show)
  }, [show])

  return (
    <>
      <Backdrop
      className='comments-backdrop'
      open={open}
      onClick={handleClose}>
      </Backdrop>
      <div>
        <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
          <div className='comments-container'>
            <div className='comments-list h-[80%]'></div>
            <CommentForm postId={postId} />
          </div>
        </Slide>
      </div>
    </>
  )
}
