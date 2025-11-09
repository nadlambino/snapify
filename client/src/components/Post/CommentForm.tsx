import './../../css/comments.css'
import { TextField } from '@mui/material'
import { AiOutlineSend } from 'react-icons/ai'
import { commentPost } from '../../api/post'
import { useState } from 'react'
import dayjs from 'dayjs'
import { FormEvent } from 'react'
import useAuth from '../../hooks/auth'

interface Props {
  postId: string,
  newCommentCB: Function
}

export default function CommentForm({ postId, newCommentCB }: Props) {
  const [comment, setComment] = useState('')
  const { user } = useAuth()

  const handleCommentChange = (value: string) => {
    setComment(value)
  }

  const handleCommentSend = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (comment.length) {
      newCommentCB({
        content: comment,
        createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        updateAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        deletedAt: null,
        user: {
          _id: user?._id || '',
          firstName: user?.firstName || 'Someone',
          lastName: user?.lastName || '',
          email: user?.email || ''
        }
      })
      commentPost({ postId, comment }).then(() => {
        setComment('')
      });
    }
  }

  return (
    <div className='comment-form'>
      <form onSubmit={handleCommentSend}>
        <TextField 
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder='Say something...'
          fullWidth
          variant="outlined"
        />
        <button onSubmit={handleCommentSend}>
          <AiOutlineSend size={30} className="text-gray-400" />
        </button>
      </form>
    </div>
  )
}
