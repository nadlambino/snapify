import { useState } from 'react'
import Comments from "./Comments";
import { PostType } from '../../types';
import { deletePost, reactPost } from '../../api/post';
import useAuth from '../../hooks/auth';
import { MdDelete, MdModeComment } from 'react-icons/md'
import { IoIosHeart } from 'react-icons/io'

export default function Actions({ post, deleteCallback }: { post: PostType, deleteCallback: Function }) {
  const [showComments, setShowComments] = useState(false)
  const { user } = useAuth()
  const [commentsCount, setCommentsCount] = useState(post.commentsCount)
  const [reactsCount, setReactsCount] = useState(post.reactsCount)
  const [reacted, setReacted] = useState(post.reacts.findIndex(react => react.user == user?._id) !== -1)
  const isOwner = post.user._id === user?._id

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

  const handleDelete = () => {
    if (!isOwner) {
      return
    }
    
    deletePost(post._id).then(() => {
      deleteCallback()
    })
  }

  return (
    <>
      <div className="post-buttons-container">
        { isOwner &&
          <button className="p-2" onClick={handleDelete}>
            <MdDelete size={32} />
          </button>
        }
        <button className="p-2" onClick={handleReact}>
          <IoIosHeart size={28} className={reacted ? 'text-red-500' : ''} />
          <small>{reactsCount}</small>
        </button>
        <button className="p-2" onClick={handleShowComments}>
          <MdModeComment size={25} />
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
