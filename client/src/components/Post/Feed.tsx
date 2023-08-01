import Post from './Post';
import { MAX_POST_PER_REQUEST, getPosts } from '../../api/post';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useTimeout } from '@mantine/hooks';
import { PostType } from '../../types';

export default function Feed() {
  const { data, fetchNextPage } = useInfiniteQuery(
    'post',
    ({ pageParam }) => {
      return getPosts(pageParam);
    },
    { enabled: false }
  );
  // TODO: Refactor posts collection to filter out duplicate posts
  const posts = useMemo(() => {
    return (data?.pages ? data.pages.flat() : []) as PostType[];
  }, [data]);
  const { start, clear } = useTimeout(([id]) => {
    fetchNextPage({
      pageParam: id,
    });
    clear();
  }, 500);

  useEffect(() => {
    fetchNextPage();
  }, []);

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
