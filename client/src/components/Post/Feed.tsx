import Post from "./Post"

export default function Feed() {
  return (
    <div className='container'>
      {Array(10).fill(1).map((index) => {
        return <Post key={Math.random()} />
      })}
    </div>
  )
}
