import { MediaType } from "../../types/PostType"
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
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        playCallback(video.duration * 1000)
      });
    }
  }, [videoRef])

  useEffect(() => {
    const video = videoRef.current;
    if (paused) {
      video?.pause()
    } else {
      video?.play()
    }
    pauseCallback(paused)
  }, [paused, videoRef])

  useEffect(() => {
    if (active) {
      setPaused(false)
    }
  }, [active])

  const handlePlayState = () => {
    setPaused(!paused)
  }

  const handleEndedState = () => {
    setPaused(true)
    endedCallback(index)
  }

  return (
    <>
      <div className={className + ' post-image-container'} onClick={handlePlayState}>
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
