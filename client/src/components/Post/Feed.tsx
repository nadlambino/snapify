import Post from "./Post"
import { getPosts } from "../../api/post"
import { useState, useEffect } from 'react'
import PostType from "../../types/PostType"

export default function Feed() {
  const [posts, setPosts] = useState<[PostType]>()

  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
    })
  }, [])

  return (
    <div className='container'>
      {posts && posts.map((post) => {
        return <Post key={post._id} post={post} />
      })}
    </div>
  )
}
