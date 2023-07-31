import Post from './Post';
import { getPosts } from '../../api/post';
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { useTimeout } from '@mantine/hooks';
import { PostType } from '../../types';

let scrollTimeout: NodeJS.Timeout;

export default function Feed() {
  const reloadPost = useSelector((state: any) => state.post.reloadPosts);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (reloadPost) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 500);
    }
  }, [reloadPost]);

  const handleGetNewPost = async (id: string) => {
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
