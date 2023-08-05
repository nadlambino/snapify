import Post from './Post';
import { getPosts } from '../../api/post';
import { useState, useEffect } from 'react';
import { PostType } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { setReloadPosts } from '../../store/modules/post';
import { useQuery } from 'react-query';

let scrollTimeout: NodeJS.Timeout;

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const reloadPost = useSelector((state: any) => state.post.reloadPosts);
  const dispatch = useDispatch();
  const { isSuccess, data, refetch } = useQuery('posts', () => getPosts(), {
    enabled: false,
  });

  useEffect(() => {
    if (reloadPost) {
      refetch().then(() => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          window.scrollTo({ top: 0 });
        }, 500);
      });
    }

    setPosts(data);
    dispatch(setReloadPosts(false));
  }, [isSuccess, reloadPost, data]);

  const handleGetNewPost = async (id: string) => {
    getPosts(id).then((data: PostType[]) => {
      const filteredData = data.filter((d) => {
        const index = posts.findIndex((p) => p._id === d._id);

        return index < 0 ? true : false;
      });

      setPosts((prev) => prev.concat(filteredData));
    });
  };

  return (
    <div className="feed-container">
      {posts &&
        posts.map((post, i) => {
          return (
            <Post
              className={i === posts.length - 1 ? 'last-post' : ''}
              getNewPostCb={handleGetNewPost}
              key={post._id}
              post={post}
            />
          );
        })}
    </div>
  );
}
