import Post from './Post';
import { MAX_POST_PER_REQUEST, getPosts } from '../../api/post';
import { useContext, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useTimeout } from '@mantine/hooks';
import { PostType } from '../../types';
import { FeedContext } from '../../contexts/FeedContext';

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { reload, setReload } = useContext(FeedContext);
  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    'post',
    ({ pageParam }) => {
      return getPosts(pageParam);
    },
    { enabled: false }
  );
  const { start: startGetPost, clear: clearGetPostTimeout } = useTimeout(
    ([id]) => {
      fetchNextPage({
        pageParam: id,
      });
      clearGetPostTimeout();
    },
    500
  );
  const { start: startScroll, clear: clearScroll } = useTimeout(() => {
    window.scrollTo({ top: 0 });
    setReload(false);
    clearScroll();
  }, 500);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (reload) {
      setPosts(data?.pages[0] as PostType[]);
      startScroll();
    }

    if (!reload) {
      let p: PostType[] = data?.pages ? data.pages[data.pages.length - 1] : [];
      const allPosts = posts
        .concat(p)
        .filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t._id === obj._id)
        );
      setPosts(allPosts);
    }
  }, [data, reload]);

  useEffect(() => {
    if (reload) {
      refetch();
    }
  }, [reload]);

  const handleGetNewPost = async (id: string) => {
    const pages = data?.pages || [];
    if (
      (pages.length > 1 &&
        pages[pages.length - 1].length < MAX_POST_PER_REQUEST) ||
      posts.length < MAX_POST_PER_REQUEST
    ) {
      return;
    }
    startGetPost(id);
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
