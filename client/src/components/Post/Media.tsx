import { MediaType } from "../../types/PostType"
import { useRef, useEffect, useState } from 'react'
import { GrVolumeMute } from 'react-icons/gr'

interface Props {
  media: MediaType,
  className: string,
  active: Boolean,
  pauseCallback: Function
}

export default function Media({ media, className, active, pauseCallback }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public', '')
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current;
    if (paused) {
      video?.pause()
    } else {
      video?.play()
    }
    pauseCallback(paused)
  }, [paused])

  const handlePlayState = () => {
    setPaused(!paused)
  }

  return (
    <div className={className + ' post-image-container'} onClick={handlePlayState}>
      {
        media.category === 'image' ?
        <img src={src} className='post-image' alt={src} />
        :
        <>
          <video muted loop ref={videoRef}>
            <source src={src} type="video/mp4"></source>
          </video>
        </>
      }
    </div>
  )
}
