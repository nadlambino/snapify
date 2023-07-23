
import './../../css/comments.css'
import { Backdrop } from '@mui/material'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import CommentForm from './CommentForm';
import { CommentType } from '../../types/app';
import Comment from './Comment';

interface Props {
  show: boolean, 
  setShowComment: Function,
  postId: string,
  comments: CommentType[],
  updateCommentsCount: Function
}

export default function Comments({ show, setShowComment, postId, comments, updateCommentsCount }: Props) {
  const [open, setOpen] = useState(show);
  const [slide, setSlide] = useState(false)
  const [localComments, setLocalComments] = useState(comments)

  const handleNewComment = (comment: CommentType) => {
    const comments = [comment, ...localComments]
    setLocalComments(comments)
    updateCommentsCount(comments.length)
  }

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
              { localComments && localComments.map((comment, index) => <Comment key={index} comment={comment} />)}
            </div>
            <CommentForm postId={postId} newCommentCB={handleNewComment} />
          </div>
        </Slide>
      </div>
    </>
  )
}
