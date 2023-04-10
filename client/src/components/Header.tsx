import { Grid, AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { isAuthenticated } from './../utils/auth'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies()
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    removeCookie('token')
    navigate('/auth')
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Grid container justifyContent="center" className='bg-primary'>
              <Grid item xs={12} md={6}>
                <Toolbar>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Link to="/" className='btn-link'>
                        <Typography variant='h6' component='div'>
                          Feed
                        </Typography>
                      </Link>
                    </Grid>
                    { 
                      isAuthenticated() &&
                      <Grid item>
                        <Button color="inherit" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </Grid>
                    }
                  </Grid>
                </Toolbar>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  );
}