import React from 'react'
import { CommentType } from '../../types/PostType'
import dayjs from 'dayjs'
import { Avatar, Typography } from '@mui/material'

export default function Comment({comment}: {comment: CommentType}) {
  const timePosted = dayjs(comment.createdAt).fromNow()

  return (
    <div className='flex p-2 gap-3 items-center'>
      <Avatar />
      <div className='comment-details flex flex-col'>
        <Typography>{ comment.content }</Typography>
        <small className='text-gray-400 text-[10px]'>{ timePosted }</small>
      </div>
    </div>
  )
}
