import { Link, useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { CgProfile, CgFeed } from 'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { useState } from 'react'
import Form from './Form'
import Create from './Post/Create'

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const getMenuActiveClass = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleSignOut = () => {
    removeCookie('token')
    navigate('/auth')
  }

  const handleFeedClick = () => {
    navigate('/')
  }

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  return (
    <Grid container justifyContent="center" className='header'>
      <Grid item xs={12} sm={7} md={5} lg={4}>
        <div className='flex items-center justify-between'>
          <Link to={'/'}>
            <div className='flex flex-col'>
              <span className='font-bold text-gray-800'>SNAPIFY</span>
              <small className='relative px-1 top-[-7px] w-full bg-primary text-gray-200'>dev</small>
            </div>
          </Link>
          <div className='flex'>
            <CgFeed size={23} className={`btn-icon ${getMenuActiveClass('/')}`} onClick={handleFeedClick} />
            <IoMdAdd size={25} className={`btn-icon`} onClick={handleClickOpen}/>
            <RiLogoutCircleRLine size={23} className='btn-icon' onClick={handleSignOut}/>
          </div>
        </div>
      </Grid>
      <Form 
        save="POST"
        show={open} 
        closeCallback={handleClose}
        component={Create}>
      </Form>
    </Grid>
  );
}