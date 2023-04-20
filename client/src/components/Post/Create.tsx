import { Grid, TextField } from "@mui/material"
import FCWithProps from '../../types/FCWithProps'
import { createPost } from "../../api/post"
import Dropzone from "../Reusable/Dropzone"
import { useState, useEffect } from 'react'

const Create: React.FC<FCWithProps> = (props) => {
  const [media, setMedia] = useState([])
  const [caption, setCaption] = useState('')
  const { saving } = props
  const [error, setError] = useState('')
  const { closeCallback } = props

  useEffect(() => {
    if (saving === true) {
      handlePostSubmit()
    }
  }, [saving])

  const handleCaptionChange = (value: string) => {
    setCaption(value)
  }

  const handlePostSubmit = async () => {
    setError('')
    if (media.length === 0) {
      setError(`Please select an image or video to post`)
      return
    }

    const formData = new FormData()
    await media.map(file => formData.append(`files`, file));
    formData.append('content', caption)

    createPost(formData).then(() => {
      closeCallback()
    }).catch(() => {
      setError('Something went wrong. Please try again later.')
    })
  }

  return (
    <Grid container gap={5} padding={2} justifyContent="space-between">
      <span className="text-center w-full">{error}</span>
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