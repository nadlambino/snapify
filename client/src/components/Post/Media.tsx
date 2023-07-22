import { MediaType } from "../../types/PostType"
import useObserver from './../../hooks/observer'
import { useRef, useEffect, useState, useCallback } from 'react'

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
  const loadedMetaDataCallback = useCallback(() => {
    if (videoRef.current) {
      playCallback(videoRef.current.duration * 1000)
    }
  }, [videoRef])

  useEffect(() => {
    setPaused(!(isVisible && active))

    return () => {
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
      }
    }
  }, [isVisible, active])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadedmetadata', loadedMetaDataCallback);
    }

    return () => {
      video?.removeEventListener('loadedmetadata', loadedMetaDataCallback)
    }
  }, [videoRef, isVisible])

  useEffect(() => {
    const video = videoRef.current;
    if (paused) {
      video?.pause()
    } else {
      video?.play()
    }
    pauseCallback(paused)
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
