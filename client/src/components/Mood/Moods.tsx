import { Grid } from "@mui/material";
import { getPosts } from "../../api/post"
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import PostType from "../../types/PostType"
import Mood from "./Mood";
import { setReloadMood } from "../../store/modules/mood";

export default function Moods() {
  const [posts, setPosts] = useState<[PostType]>()
  const reloadMood = useSelector((state: any) => (state.mood.reload))
  const [cookies] = useCookies()
  const { user } = cookies
  const dispatch = useDispatch()
  const moodsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    }).finally(() => {
      dispatch(setReloadMood(false))
      if (moodsRef.current) {
        moodsRef.current.scrollTo({left: 0, behavior: 'smooth'})
      }
    })
  }, [reloadMood])

  return (
    <Grid item xs={12} 
      ref={moodsRef}
      container 
      gap="5px" 
      direction="row" 
      flexWrap="nowrap"
      className="moods-container cursor-default select-none"
      style={{scrollSnapType: "x mandatory", overflowX: 'scroll', overflowY: 'hidden'}}>
      {
        posts && posts.map(post => (
          <Mood mood={post} key={post._id} owned={user._id === post.user._id} />
        ))
      }
      
    </Grid>
  )
}
