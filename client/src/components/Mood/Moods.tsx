import { Grid } from "@mui/material";
import { getPosts } from "../../api/post"
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import PostType from "../../types/PostType"
import Mood from "./Mood";
import mood, { setReloadMood } from "../../store/modules/mood";

export default function Moods() {
  const [posts, setPosts] = useState<[PostType]>()
  const reloadMood = useSelector((state: any) => (state.mood.reload))
  const [cookies] = useCookies()
  const { user } = cookies
  const dispatch = useDispatch()
  const moodsRef = useRef<HTMLDivElement>(null)
  const press = useRef<boolean>(false)
  const startX = useRef<number>(0)

  const handleMouseDown = (clientX: number) => {
    press.current = true
    startX.current = clientX
  }

  const handleMouseLeave = () => {
    press.current = false
  }

  const handleMouseUp = () => {
    press.current = false
  }

  const handleMouseMove = (clientX: number) => {
    if (press.current === false) {
      return
    }

    moodsRef.current?.scrollTo({
      left: moodsRef.current.scrollLeft + (startX.current - clientX)
    })
  }

  useEffect(() => {
    moodsRef.current?.addEventListener('mousedown', (e) => handleMouseDown(e.clientX))
    moodsRef.current?.addEventListener('mouseleave', handleMouseLeave)
    moodsRef.current?.addEventListener('mouseup', handleMouseUp)
    moodsRef.current?.addEventListener('mousemove', (e) => handleMouseMove(e.clientX))
  })

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
      className="moods-container select-none scroll-smooth cursor-grab"
      style={{scrollSnapType: "x mandatory", overflowX: 'scroll', overflowY: 'hidden'}}>
      {
        posts && posts.map(post => (
          <Mood mood={post} key={post._id} owned={user._id === post.user._id} />
        ))
      }
      
    </Grid>
  )
}
