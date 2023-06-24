
import './../../css/comments.css'
import { Backdrop } from '@mui/material'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import CommentForm from './CommentForm';
import { CommentType } from '../../types/PostType';
import Comment from './Comment';

interface Props {
  show: boolean, 
  setShowComment: Function,
  postId: string,
  comments: CommentType[]
}

export default function Comments({ show, setShowComment, postId, comments }: Props) {
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
            <div className='comments-list h-[80%] flex flex-col gap-1 overflow-scroll'>
              { comments && comments.map((comment, index) => <Comment key={index} comment={comment} />)}
            </div>
            <CommentForm postId={postId} />
          </div>
        </Slide>
      </div>
    </>
  )
}
