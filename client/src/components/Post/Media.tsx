import { MediaType } from "../../types/PostType"

interface Props {
  media: MediaType,
  className: string
}

export default function Media({ media, className }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public\\', '')

  return (
    <div className={className + ' post-image-container'}>
      {
        media.category === 'image' ?
        <img src={src} className='post-image' alt="Post Photo" />
        :
        <video muted autoPlay>
          <source src={src} type="video/mp4"></source>
        </video>
      }
    </div>
  )
}
