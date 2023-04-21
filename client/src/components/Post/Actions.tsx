import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react'
import Comments from "./Comments";
import { PostType } from '../../types/PostType';

export default function Actions({ post }: { post: PostType }) {
  const [showComments, setShowComments] = useState(false)

  const handleShowComments = () => {
    setShowComments(true)
  }

  return (
    <>
      <div className="post-buttons-container">
        <button className="p-2">
          <FavoriteIcon fontSize="large" />
        </button>
        <button className="p-2" onClick={handleShowComments}>
          <ModeCommentIcon fontSize="large" />
        </button>
      </div>
      <Comments 
        show={showComments} 
        setShowComment={setShowComments} 
        postId={post._id}
        comments={post.comments}
      />
    </>
  )
}
