import { MediaType } from "../../types/PostType"
import useObserver from './../../hooks/observer'
import { useRef, useEffect, useState } from 'react'

interface Props {
  media: MediaType,
  className: string,
  index: number,
  active: boolean,
  playCallback: Function,
  pauseCallback: Function,
  endedCallback: Function
}

export default function Media({ media, className, index, active, playCallback, pauseCallback, endedCallback }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public', '')
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true)
  const { isVisible } = useObserver(`.media-container-${media._id}`, {threshold: 0.7})

  useEffect(() => {
    setPaused(!(isVisible && active))
    const video = videoRef.current

    // Handles intial load of video to get duration on metadata load
    if (video) {
      video.onloadedmetadata = () => playCallback(video.duration * 1000, media._id)
    }
    
    // Handles the next videos to simply get the video duration
    if (video && video?.duration) {
      playCallback(video.duration * 1000, media._id)
    }

    // Triggers the playCallback with default duration when video is not existing means the media is image
    if (!video) {
      playCallback(5000, media._id)
    }

    return () => {
      if (video) {
        video.currentTime = 0
      }
    }
  }, [isVisible, active])

  useEffect(() => {
    const video = videoRef.current;
    if (paused) {
      video?.pause()
    } else {
      video?.play()
    }
    pauseCallback(paused, media._id)
  }, [paused, videoRef])

  const handlePlayState = () => {
    setPaused(!paused)
  }

  const handleEndedState = () => {
    setPaused(true)
    endedCallback(index)
  }

  return (
    <>
      <div className={className + ` post-image-container media-container-${media._id} `} onClick={handlePlayState}>
        {
          media.category === 'image' ?
          <img src={src} className='post-image' alt={src} />
          :
          <>
            <video muted ref={videoRef} onEnded={handleEndedState}>
              <source src={src} type="video/mp4"></source>
            </video>
          </>
        }
      </div>
    </>
  )
}
