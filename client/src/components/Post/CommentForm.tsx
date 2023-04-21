import './../../css/comments.css'
import { TextField } from '@mui/material'
import { AiOutlineSend } from 'react-icons/ai'
import { commentPost } from '../../api/post'
import { useState } from 'react'

interface Props {
  postId: string
}

export default function CommentForm({ postId }: Props) {
  const [comment, setComment] = useState('')

  const handleCommentChange = (value: string) => {
    setComment(value)
  }

  const handleCommentSend = () => {
    commentPost({ postId, comment }).then(() => {
      setComment('')
    })
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
