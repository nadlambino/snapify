import Post from "./Post"
import { getPosts } from "../../api/post"
import { useState, useEffect } from 'react'
import { PostType } from './../../types/PostType'
import { useSelector } from "react-redux";

export default function Feed() {
  const [posts, setPosts] = useState<[PostType]>()
  const reloadPost = useSelector((state: any) => (state.post.reloadPosts))

  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    })
  }, [reloadPost])

  return (
    <div className='container'>
      {posts && posts.map((post) => {
        return <Post key={post._id} post={post} />
      })}
    </div>
  )
}
