import './../../css/comments.css'
import { TextField } from '@mui/material'
import { AiOutlineSend } from 'react-icons/ai'

export default function CommentForm() {
  return (
    <div className='comment-form'>
      <TextField 
        placeholder='Say something...'
        multiline
        rows={2}
        fullWidth
        variant="standard"
      />
      <AiOutlineSend size={30} className="text-gray-800" />
    </div>
  )
}
