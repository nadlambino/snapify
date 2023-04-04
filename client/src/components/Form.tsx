import { useState, useEffect, Ref, forwardRef, ReactElement, ReactNode } from 'react'
import { Button, Dialog, AppBar, Toolbar, Slide, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormProps {
  title?: String,
  show: boolean,
  closeCallback?: Function,
  children?: ReactNode
}

export default function Form(props: FormProps) {
  const { title, show, closeCallback, children } = props
  const [open, setOpen] = useState(show);

  useEffect(() => {
    if (show) {    
      handleClickOpen()
    }
  }, [show])

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
    if (typeof closeCallback === 'function') {
      closeCallback()
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title && title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            SAVE
          </Button>
        </Toolbar>
      </AppBar>
      {children && children}
    </Dialog>
  );
}