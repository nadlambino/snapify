import { useEffect, useState } from "react"
import { getPosts } from "../../api/post"
import Post from "./Post"
import PostType from "../../types/PostType"
import { Grid } from "@mui/material"

export default function Feed() {
  const [posts, setPosts] = useState<[PostType]>()
  
  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    })
  }, [])

  return (
    <Grid container>
    {
      posts && posts.map(post => (
        <Post post={post} key={post._id} />
      ))
    }
    </Grid>
  )
}
