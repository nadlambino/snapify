import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react'
import Comments from "./Comments";
import { PostType } from '../../types';
import { reactPost } from '../../api/post';
import useAuth from '../../hooks/auth';

export default function Actions({ post }: { post: PostType }) {
  const [showComments, setShowComments] = useState(false)
  const { user } = useAuth()
  const [commentsCount, setCommentsCount] = useState(post.commentsCount)
  const [reactsCount, setReactsCount] = useState(post.reactsCount)
  const [reacted, setReacted] = useState(post.reacts.findIndex(react => react.user == user?._id) !== -1)

  const handleShowComments = () => {
    setShowComments(true)
  }

  const handleCommentCountUpdate = (count: number) => {
    setCommentsCount(count)
  }

  const handleReact = () => {
    const postId = post._id;
    let count = reactsCount;
    if (reacted) {
      count -= 1
    } else {
      count += 1
    }

    setReacted(!reacted)
    setReactsCount(count)
    reactPost({ postId })
  }

  return (
    <>
      <div className="post-buttons-container">
        <button className="p-2" onClick={handleReact}>
          <FavoriteIcon fontSize="large" className={reacted ? 'text-red-500' : ''} />
          <small>{reactsCount}</small>
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
