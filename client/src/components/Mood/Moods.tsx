import { Grid } from "@mui/material";
import { getPosts } from "../../api/post"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostType from "../../types/PostType"
import Mood from "./Mood";

export default function Moods() {
  const [posts, setPosts] = useState<[PostType]>()
  const reloadFeed = useSelector((state: any) => (state.feed))
  
  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    })
  }, [reloadFeed])

  return (
    <Grid item xs={12} 
      container 
      gap="5px" 
      direction="row" 
      flexWrap="nowrap"
      style={{scrollSnapType: "x mandatory", overflowX: 'scroll'}}>
      {
        posts && posts.map(post => (
          <Mood mood={post} key={post._id} />
        ))
      }
      
    </Grid>
  )
}
