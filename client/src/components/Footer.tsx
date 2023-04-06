import { useState } from 'react'
import {Grid, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form';
import CreateTodo from './Todo/Create';

export default function Footer() {
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Form 
        title="Create your task"
        show={open} 
        closeCallback={handleClose}>
        <CreateTodo />
      </Form>
      <Grid container justifyContent="center" position="absolute" bottom={20}>
        <Grid item xs={12} md={8} container justifyContent="end" alignItems="end" position="relative" right={20}>
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  )
}
