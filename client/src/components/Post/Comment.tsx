import { CommentType } from '../../types'
import dayjs from 'dayjs'
import { Avatar } from '@mui/material'

export default function Comment({comment}: {comment: CommentType}) {
  const timePosted = dayjs(comment.createdAt).fromNow()
  const fullName = `${comment.user.firstName} ${comment.user.lastName}`

  return (
    <div className='flex p-2 gap-3 items-center'>
      <Avatar />
      <div className='comment-details flex flex-col w-full'>
        <small className='text-gray-600 font-bold capitalize'>{ fullName }</small>
        <span className='w-full block relative top-[-1px]'>{ comment.content }</span>
        <small className='text-gray-500 text-[11px]'>{ timePosted }</small>
      </div>
    </div>
  )
}
