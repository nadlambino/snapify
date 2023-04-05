import { Grid, AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export default function Header() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Grid container justifyContent="center">
              <Grid item xs={8}>
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                  </Typography>
                  <Button color="inherit">Login</Button>
                </Toolbar>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  );
}