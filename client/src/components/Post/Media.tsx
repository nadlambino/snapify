import { MediaType } from "../../types/PostType"
import { useRef, useEffect, useState, useMemo } from 'react'

interface Props {
  media: MediaType,
  className: string,
  index: number,
  active: boolean,
  totalMedia: number,
  pauseCallback: Function,
  endedCallback: Function
}

export default function Media({ media, className, index, active, totalMedia, pauseCallback, endedCallback }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public', '')
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false)
  const thumbLength = useMemo(() => 100 / totalMedia, [totalMedia])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration;
        console.log('Video Duration: ', videoDuration); // Duration is in seconds
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
