import { useState, useEffect, Ref, forwardRef, ReactElement, ReactNode } from 'react'
import { Button, Dialog, AppBar, Toolbar, Slide, Typography, IconButton, Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import { isAuthenticated } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import FCWithProps from '../types/FCWithProps'

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
  save?: String,
  show: boolean,
  closeCallback?: Function,
  children?: ReactNode,
  component: React.FC<FCWithProps>
}

export default function Form(props: FormProps) {
  const { title, show, closeCallback, save } = props
  const Component = props.component
  const [open, setOpen] = useState(show)
  const [saving, setSaving] = useState(false)
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

    return () => {
      setSaving(false)
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

  const handleClickSave = () => {
    setSaving(true)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="xs"
    >
      <AppBar sx={{ position: 'relative' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, fontSize: 16 }} variant="h6" component="div">
                {title && title}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClickSave}>
                {save || 'SAVE'}
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <Grid container justifyContent="center" top={70}>
        <Grid item xs={12}>
          <Component saving={saving} />
        </Grid>
      </Grid>
    </Dialog>
  );
}