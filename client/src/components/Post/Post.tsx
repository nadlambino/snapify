import { PostType, MediaType, UserType } from '../../types';
import Media from './Media';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { Avatar } from '@mui/material';
import './../../css/post.css';
import Actions from './Actions';
import useSwipe, { SwipeDirection } from '../../hooks/swipe';
import useClickOutside from '../../hooks/click';
import useObserver from '../../hooks/observer';

interface Props {
  post: PostType;
  className: string;
  getNewPostCb: Function;
}

export default function Post({ post, className, getNewPostCb }: Props) {
  const media: [MediaType] = post.media;
  const [isDeleted, setIsDeleted] = useState(false);
  const user: UserType = post.user;
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const timePosted = dayjs(post.createdAt).fromNow();
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const { swipeDirection } = useSwipe();
  const clickPosition = useClickOutside('.feed-container');
  let timeout: any = 0;
  const { isVisible } = useObserver('.last-post', { threshold: 0.5 });
  const { isVisible: isPostVisible } = useObserver(`.post-${post._id}`, {
    threshold: 0.5,
  });

  useEffect(() => {
    if (isVisible && className === 'last-post') {
      getNewPostCb(post._id);
    }
  }, [isVisible, className]);

  useEffect(() => {
    handleSlideChange(swipeDirection);
  }, [swipeDirection]);

  useEffect(() => {
    let position: SwipeDirection = null;
    if (clickPosition === 'left') {
      position = 'right';
    } else if (clickPosition === 'right') {
      position = 'left';
    }

    handleSlideChange(position);
  }, [clickPosition]);

  const handleSlideChange = (position: SwipeDirection) => {
    if (position === 'left' && activeSlide < media.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (position === 'right' && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const playCallback = (duration: number, mediaId: string) => {
    const thumbElement = document.getElementById(`slide-${mediaId}`);
    if (thumbElement) {
      thumbElement.classList.remove('slide-animation');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        thumbElement.classList.add('slide-animation');
        thumbElement.style.animationPlayState = 'running';
        thumbElement.style.animationDuration = `${duration}ms`;
      }, 200);
    }
  };

  const pauseCallback = (paused: Boolean, mediaId: string) => {
    const thumbElement = document.getElementById(`slide-${mediaId}`);
    if (thumbElement) {
      thumbElement.style.animationPlayState = paused ? 'paused' : 'running';
    }
  };

  const endedCallback = (index: number) => {
    if (media.length === 1) {
      return;
    }

    const slideIndex = media.length - 1 === index ? 0 : index + 1;
    setActiveSlide(slideIndex);
  };

  const deleteCallback = () => {
    setIsDeleted(() => true);
  };

  return isDeleted ? (
    <></>
  ) : (
    <div className={'item' + ' ' + className + ' post-' + post._id}>
      <div className="post-details-container">
        <div className="overlay-top"></div>
        <Avatar
          alt={fullName}
          sx={{ bgcolor: '#2A2F4F', fontSize: '14px' }}
        >
          {initials}
        </Avatar>
        <div className="flex flex-col">
          <span className="fullname">{fullName}</span>
          <small className="time-posted">{timePosted}</small>
        </div>
      </div>
      <div
        className="post-image-wrapper"
        ref={containerRef}
      >
        <div className="thumb-container">
          {media.length > 0 &&
            media.map((data, index) => (
              <span
                key={data._id}
                className={`slide-thumb-item ${
                  index === activeSlide ? 'slide-active' : ''
                } ${index < activeSlide ? 'slide-prev' : ''}`}
              >
                <span
                  ref={thumbRef}
                  className={`slide-animation`}
                  id={`slide-${data._id}`}
                ></span>
              </span>
            ))}
        </div>
        <div className="post-image-container">
          {media.map((image, index) => (
            <Media
              media={image}
              key={index}
              index={index}
              active={index === activeSlide}
              className={index === activeSlide ? 'flex' : 'hidden'}
              playCallback={playCallback}
              pauseCallback={pauseCallback}
              endedCallback={endedCallback}
            />
          ))}
        </div>
        <Actions
          isHideComment={!isPostVisible}
          post={post}
          deleteCallback={deleteCallback}
        />
        {post.content && (
          <div className="post-content-container">
            <div className="overlay-bottom"></div>
            <span className="text-white">{post.content}</span>
          </div>
        )}
      </div>
    </div>
  );
}
