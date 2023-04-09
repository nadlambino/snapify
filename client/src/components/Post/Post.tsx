import { Grid } from "@mui/material"
import PostType from "../../types/PostType"

export default function Post(props: {post: PostType}) {
  const { post } = props

  return (
    <Grid item xs={12}>{post.content}</Grid>
  )
}
