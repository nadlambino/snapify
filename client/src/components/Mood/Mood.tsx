import { Grid, Button } from '@mui/material'
import PostType from "../../types/PostType"
import dayjs from "dayjs"
import DeleteForeverIcon from '@mui/icons-material/Add'

export default function Mood(props: {mood: PostType, owned: boolean}) {
  const { mood, owned } = props
  const fullName = `${mood.user.firstName} ${mood.user.lastName}`
  const postedAt = dayjs(mood.createdAt)
  const diff = dayjs().diff(postedAt, 'hour')
  const timePostedFromNow = diff >= 24 ? dayjs(postedAt).format('YYYY-MM-DD hh:mm A') : dayjs(mood.createdAt).fromNow()
  const moodConjunction = mood.user.lastName.toLocaleLowerCase().endsWith('s') ? `' mood` : `'s mood`
  const moodLabel = diff >= 1 ? `${moodConjunction} was` : `${moodConjunction} right now`

  return (
    <Grid 
      item xs={4} 
      position="relative" 
      style={{flex: '0 0 calc((100% / 3) - 4px)', scrollSnapAlign: 'center', borderRadius: 10, minHeight: "150px"}} 
      className='bg-[#FFF3E2] p-3'>
        <div className='flex justify-between items-start'>
          <div className='ellipsis'>
            <p className="text-[#4F4557] text-[12px] ellipsis">{fullName}</p>
            <small className='text-[#6D5D6E] text-[10px] ellipsis'>{timePostedFromNow}</small>
          </div>
          <div>
            { 
              owned &&
              <DeleteForeverIcon style={{color: 'gray', fontSize: '16px', transform: 'rotate(45deg)'}} className='hover:cursor-pointer relative top-[-3px]' />
            }
          </div>
        </div>
        <div className='h-[70%] flex justify-center items-center'>
          <p className='ellipsis'>{mood.content}</p>
        </div>
    </Grid>
  )
}
