import { MediaType } from "../../types/PostType"

interface Props {
  media: MediaType
}

export default function Media({ media }: Props) {
  const src = window.apiUrl + '/' + media?.src?.replace('public\\', '')

  return (
    <div className='post-image-container'>
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
