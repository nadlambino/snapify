import { MediaType } from "../../types/PostType"
import { useRef, useEffect } from 'react'

interface Props {
  media: MediaType,
  className: string
}

export default function Media({ media, className }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public', '')
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", function() {
      this.currentTime = 0;
      this.play();
    });
  }, []);


  return (
    <div className={className + ' post-image-container'}>
      {
        media.category === 'image' ?
        <img src={src} className='post-image' alt={src} />
        :
        <video muted autoPlay loop ref={videoRef}>
          <source src={src} type="video/mp4"></source>
        </video>
      }
    </div>
  )
}
