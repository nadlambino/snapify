import { Link, useLocation } from 'react-router-dom'
import { Grid, Badge } from '@mui/material'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { CgProfile, CgFeed } from 'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies()
  const navigate = useNavigate()
  const location = useLocation()

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
          <CgFeed size={23} className={`btn-icon ${getMenuActiveClass('/')}`} onClick={handleFeedClick} />
          <BsSearch size={21} className={`btn-icon ${getMenuActiveClass('/search')}`} />
          <CgProfile size={23} className={`btn-icon ${getMenuActiveClass('/profile')}`} />
          <FiSettings size={23} className={`btn-icon ${getMenuActiveClass('/settings')}`} onClick={handleSettingsClick}/>
          <RiLogoutCircleRLine size={23} className='btn-icon' onClick={handleSignOut}/>
        </div>
      </Grid>
    </Grid>
  );
}