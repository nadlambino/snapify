import { useState, useEffect, Ref, forwardRef, ReactElement, ReactNode } from 'react'
import { Button, Dialog, AppBar, Toolbar, Slide, Typography, IconButton, Grid, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormComponent } from '../types';

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
  saveIcon?: ReactElement,
  show: boolean,
  closeCallback?: Function,
  children?: ReactNode,
  component: React.FC<FormComponent>
}

export default function Form(props: FormProps) {
  const { title, show, closeCallback, save, saveIcon } = props
  const Component = props.component
  const [open, setOpen] = useState(show)
  const [saving, setSaving] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (show) { 
      handleClickOpen()
    }

    return () => {
      setSaving(false)
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

  const handleClickSave = () => {
    setSaving(true)
  }

  const handleFailedSave = () => {
    setSaving(false)
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }} className='bg-primary'>
        <Grid container justifyContent="center" className='bg-primary'>
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
              <Button autoFocus color="inherit" onClick={handleClickSave} className='flex gap-2 !p-0'>
                {save || 'SAVE'}
                {saveIcon}
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <Grid container justifyContent="center" top={70}>
        <Grid item xs={12}>
          <Component 
            saving={saving} 
            handleClose={handleClose} 
            closeCallback={handleClose}
            failedSave={handleFailedSave}  
          />
        </Grid>
      </Grid>
    </Dialog>
  );
}