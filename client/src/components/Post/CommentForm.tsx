import './../../css/comments.css'
import { TextField } from '@mui/material'
import { AiOutlineSend } from 'react-icons/ai'
import { commentPost } from '../../api/post'
import { useState } from 'react'
import { CommentType, UserType } from '../../types/PostType'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { getAuthUser } from '../../utils/auth'

interface Props {
  postId: string,
  newCommentCB: Function
}

export default function CommentForm({ postId, newCommentCB }: Props) {
  const [comment, setComment] = useState('')
  const [user, setUser] = useState<UserType | null>(null)

  const handleCommentChange = (value: string) => {
    setComment(value)
  }

  useEffect(() => {
    setUser(getAuthUser())
  }, [])

  const handleCommentSend = () => {
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

  return (
    <div className='comment-form'>
      <TextField 
        value={comment}
        onChange={(e) => handleCommentChange(e.target.value)}
        placeholder='Say something...'
        multiline
        rows={2}
        fullWidth
        variant="standard"
      />
      <AiOutlineSend size={30} className="text-gray-800" onClick={handleCommentSend}/>
    </div>
  )
}
