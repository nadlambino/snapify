import { useEffect, useState } from "react"
import { getPosts } from "../../api/post"
import Post from "./Post"
import PostType from "../../types/PostType"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"

export default function Feed() {
  const [posts, setPosts] = useState<[PostType]>()
  const reloadFeed = useSelector((state: any) => (state.feed))
  
  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    })
  }, [reloadFeed])

  return (
    <Grid item xs={12} container>
    {
      posts && posts.map(post => (
        <Post post={post} key={post._id} />
      ))
    }
    </Grid>
  )
}
