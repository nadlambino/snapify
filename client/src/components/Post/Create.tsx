import { Grid, TextField } from "@mui/material"
import FCWithProps from '../../types/FCWithProps'
import { createPost } from "../../api/post"
import Dropzone from "../Reusable/Dropzone"
import { useState, useEffect } from 'react'

const Create: React.FC<FCWithProps> = (props) => {
  const [media, setMedia] = useState([])
  const [caption, setCaption] = useState('')
  const { saving } = props

  useEffect(() => {
    if (saving === true) {
      handlePostSubmit()
    }
  }, [saving])

  const handleCaptionChange = (value: string) => {
    setCaption(value)
  }

  const handlePostSubmit = async () => {
    if (media.length === 0) {
      alert(`Can't post without an image or video content`)
      return
    }

    const formData = new FormData()
    await media.map((file, index) => formData.append(`files`, file));
    formData.append('content', caption)

    createPost(formData)
  }

  return (
    <Grid container gap={5} padding={2} justifyContent="space-between">
      <Dropzone setMedia={setMedia} />
      <TextField 
        multiline 
        maxRows={4} 
        variant="standard" 
        label="Caption" 
        fullWidth 
        onChange={(e) => handleCaptionChange(e.target.value)} />
    </Grid>
  )
}

export default Create