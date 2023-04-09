import { Grid, TextField, Paper, Button } from "@mui/material"
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react"
import { useState, useEffect } from "react"
import FCWithProps from '../../types/FCWithProps'

const Create: React.FC<FCWithProps> = (props) => {
  const [mood, setMood] = useState("")
  const characterLimit = 50

  useEffect(() => {
    if (props.saving) {
      handleSave()
    }
  }, [props.saving])

  const handleEmojiChange = (emoji: EmojiClickData) => {
    if ((mood.length + emoji.emoji.length) >= characterLimit) {
      return
    }
    setMood((prev) => (prev + emoji.emoji))
  }

  const handleEmojiClear = () => {
    setMood(() => (''))
  }

  const handleSave = () => {
    console.log('Saving...')
  }

  return (
    <Grid container gap={2} padding={3} justifyContent="center">
      <Grid item xs={12}>
        <Paper 
          elevation={0} 
          style={{fontSize: 35, display: 'flex', justifyContent: 'center', padding: 5, letterSpacing: -5, textAlign: 'center'}}>
          {mood}
        </Paper>
        {
          mood.length ?
          <Grid container justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={handleEmojiClear}>
              <small>
                Clear
              </small>
            </Button>
            <small style={{color: "gray", fontSize: 12}}>
              {mood.length}/{characterLimit}
            </small>
          </Grid>
          : ''
        }
      </Grid>
      <Grid item xs={12}>
        <EmojiPicker 
          width="100%" 
          height={450}
          emojiStyle={EmojiStyle.APPLE} 
          lazyLoadEmojis={true}
          onEmojiClick={(emoji) => handleEmojiChange(emoji)} 
        />
      </Grid>
    </Grid>
  )
}

export default Create