import { useState, useEffect, Ref, forwardRef, ReactElement, ReactNode } from 'react'
import { Button, Dialog, AppBar, Toolbar, Slide, Typography, IconButton, Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import { isAuthenticated } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

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
  const [open, setOpen] = useState(show)
  const navigate = useNavigate()
  const [cookies] = useCookies()
  const isAuth = isAuthenticated()

  useEffect(() => {
    if (!isAuth) {
      return navigate('/auth')
    }

    if (show) {    
      handleClickOpen()
    }
  }, [show, cookies])

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
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
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
          </Grid>
        </Grid>
      </AppBar>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {children && children}
        </Grid>
      </Grid>
    </Dialog>
  );
}