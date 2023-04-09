import { Grid, Typography, Button } from "@mui/material"
import PostType from "../../types/PostType"
import dayjs from "dayjs"

export default function Post(props: {post: PostType}) {
  const { post } = props
  const postedAt = dayjs(post.createdAt)
  const diff = dayjs().diff(postedAt, 'hour')
  const timePostedFromNow = diff >= 24 ? dayjs(postedAt).format('YYYY-MM-DD hh:mm A') : dayjs(post.createdAt).fromNow()
  const moodConjunction = post.user.lastName.toLocaleLowerCase().endsWith('s') ? `' mood` : `'s mood`
  const moodLabel = diff >= 1 ? `${moodConjunction} was` : `${moodConjunction} right now`

  return (
    <Grid item xs={12}>
      <p className="text-gray-700 text-[18px]">
        {`${post.user.firstName} ${post.user.lastName}`}
        <small className="text-gray-500">{moodLabel}</small>
        <span className="text-[26px]">{post.content}</span>
      </p>
      <small className="text-gray-400">{timePostedFromNow}</small>
      <Grid container justifyContent="flex-end" gap={1}>
        <Button>React</Button>
        <Button>Comment</Button>
      </Grid>
    </Grid>
  )
}
