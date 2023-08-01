import Post from './Post';
import { MAX_POST_PER_REQUEST, getPosts } from '../../api/post';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useTimeout } from '@mantine/hooks';
import { PostType } from '../../types';

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { data, fetchNextPage } = useInfiniteQuery(
    'post',
    ({ pageParam }) => {
      return getPosts(pageParam);
    },
    { enabled: false }
  );
  const { start, clear } = useTimeout(([id]) => {
    fetchNextPage({
      pageParam: id,
    });
    clear();
  }, 500);

  useEffect(() => {
    fetchNextPage();
  }, []);

  useEffect(() => {
    let p: PostType[] = data?.pages ? data.pages[data.pages.length - 1] : [];
    const allPosts = posts
      .concat(p)
      .filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      );

    setPosts(allPosts);
  }, [data]);

  const handleGetNewPost = async (id: string) => {
    const pages = data?.pages || [];
    if (
      pages.length > 1 &&
      pages[pages.length - 1].length < MAX_POST_PER_REQUEST
    ) {
      return;
    }
    start(id);
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
