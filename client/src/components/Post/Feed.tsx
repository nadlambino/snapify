import Post from "./Post"
import { getPosts } from "../../api/post"
import { useState, useEffect } from 'react'
import { PostType } from './../../types/PostType'
import { useSelector, useDispatch } from "react-redux";
import { setReloadPosts } from "../../store/modules/post";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>()
  const reloadPost = useSelector((state: any) => (state.post.reloadPosts))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setReloadPosts(true))
  }, [])

  useEffect(() => {
    if (reloadPost === true) {
      getPosts().then(posts => {
        setPosts(posts)
        dispatch(setReloadPosts(false))
      })
    }
  }, [reloadPost])

  return (
    <div className='container'>
      {posts && posts.map((post) => {
        return <Post key={post._id} post={post} />
      })}
    </div>
  )
}
