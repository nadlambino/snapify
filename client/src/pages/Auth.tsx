import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Grid, Button, Typography, Link } from '@mui/material'
import SignIn from "../components/Auth/SignIn"
import SignUp from "../components/Auth/SignUp"

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleFormToggle = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className="App">
      <Header />
      <Grid container justifyContent="center">
        <Grid item container direction="column" justifyContent="center" xs={4}>
          <>
          {
            isSignIn ? 
              <SignIn>
                <Typography top={-10} position="relative">
                  No account yet? &nbsp;
                  <Link component="button" underline="none" onClick={handleFormToggle}>Sign Up</Link>
                </Typography>
              </SignIn>
            : 
              <SignUp>
                <Typography>
                  Already have an account? &nbsp;
                  <Link component="button" underline="none" onClick={handleFormToggle}>Sign In</Link>
                </Typography>
              </SignUp>
          }
          </>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default Auth