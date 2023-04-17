export default function Media({media}) {
  console.log(media)
  const src = window.apiUrl + '/' + media?.src?.replace('public\\', '')

  return (
    <div className='post-image-container'>
      <img src={src} className='post-image' alt="Post Photo" />
    </div>
  )
}
