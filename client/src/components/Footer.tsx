import { useState } from 'react'
import {Grid, Fab} from '@mui/material';
import Form from './Form';
import CreateMood from './Mood/Create';
import { isAuthenticated } from '../utils/auth';
import AddReactionIcon from '@mui/icons-material/AddReaction';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const isAuth = isAuthenticated()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    !isAuth ? <></> :
    <>
      <Form 
        title="What's your mood?"
        save="POST"
        show={open} 
        closeCallback={handleClose}
        component={CreateMood}>
      </Form>
      <Grid container justifyContent="center" position="fixed" bottom={20}>
        <Grid item xs={12} md={6} container justifyContent="end" alignItems="end" position="relative" right={20}>
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddReactionIcon fontSize='large' style={{fontSize: '38px'}} />
          </Fab>
        </Grid>
      </Grid>
    </>
  )
}
