import { Grid, AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { isAuthenticated } from './../utils/auth'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { CgProfile, CgFeed } from 'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies()
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    removeCookie('token')
    navigate('/auth')
  }

  const handleFeedClick = () => {
    navigate('/')
  }

  const handleSettingsClick = () => {
    navigate('settings')
  }

  return (
    <Grid container justifyContent="center" className='header'>
      <Grid item xs={12} sm={7} md={5} lg={4} padding={2} paddingTop={1}>
        <div className='flex items-center justify-between'>
          <Typography>App Name</Typography>
          <CgFeed size={23} className='btn-icon' onClick={handleFeedClick} />
          <BsSearch size={21} className='btn-icon' />
          <CgProfile size={23} className='btn-icon' />
          <FiSettings size={23} className='btn-icon' onClick={handleSettingsClick}/>
          <RiLogoutCircleRLine size={23} className='btn-icon' onClick={handleSignOut}/>
        </div>
      </Grid>
    </Grid>
  );
}