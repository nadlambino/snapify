
import './../../css/comments.css'
import { Backdrop } from '@mui/material'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import CommentForm from './CommentForm';

export default function Comments({show, setShowComment}: { show: boolean, setShowComment: Function }) {
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
            <CommentForm />
          </div>
        </Slide>
      </div>
    </>
  )
}
