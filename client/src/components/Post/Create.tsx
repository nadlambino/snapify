import { Grid, TextField } from "@mui/material"
import FCWithProps from '../../types/FCWithProps'
import { createPost } from "../../api/post"
import Dropzone from "../Reusable/Dropzone"
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setReloadPosts } from "../../store/modules/post"

const Create: React.FC<FCWithProps> = (props) => {
  const [media, setMedia] = useState([])
  const [caption, setCaption] = useState('')
  const { saving } = props
  const [error, setError] = useState('')
  const { closeCallback, failedSave } = props
  const dispatch = useDispatch()
  const limit = 200

  useEffect(() => {
    if (saving === true) {
      handlePostSubmit()
    }
  }, [saving])

  const handleCaptionChange = (value: string) => {
    if (value.length <= limit || value.length < caption.length) {
      setCaption(value)
    }
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
      dispatch(setReloadPosts(true))
    }).catch(() => {
      if (typeof failedSave === 'function') {
        failedSave()
      }
      setError('Something went wrong. Please try again later.')
    })
  }

  return (
    <Grid container gap={5} padding={2} justifyContent="space-between">
      <span className="text-center w-full">{error}</span>
      <Dropzone setMedia={setMedia} />
      <div className="w-full">
        <TextField 
          value={caption}
          multiline 
          maxRows={4} 
          variant="standard" 
          label="Caption" 
          fullWidth 
          onChange={(e) => handleCaptionChange(e.target.value)} />
          <small className="text-gray-500 w-full text-right block">{caption.length}/{limit}</small>
      </div>
    </Grid>
  )
}

export default Create