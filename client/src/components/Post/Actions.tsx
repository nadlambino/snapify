import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react'
import Comments from "./Comments";
import { PostType } from '../../types/PostType';

export default function Actions({ post }: { post: PostType }) {
  const [showComments, setShowComments] = useState(false)
  const [commentsCount, setCommentsCount] = useState(post.commentsCount)

  const handleShowComments = () => {
    setShowComments(true)
  }

  const handleCommentCountUpdate = (count: number) => {
    setCommentsCount(count)
  }

  return (
    <>
      <div className="post-buttons-container">
        <button className="p-2">
          <FavoriteIcon fontSize="large" />
          <small>{post.reactsCount}</small>
        </button>
        <button className="p-2" onClick={handleShowComments}>
          <ModeCommentIcon fontSize="large" />
          <small>{commentsCount}</small>
        </button>
      </div>
      <Comments 
        show={showComments} 
        setShowComment={setShowComments} 
        postId={post._id}
        comments={post.comments}
        updateCommentsCount={handleCommentCountUpdate}
      />
    </>
  )
}
