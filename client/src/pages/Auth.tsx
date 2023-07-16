import { useState } from "react"
import { Grid, Typography, Link } from '@mui/material'
import SignIn from "../components/Auth/SignIn"
import SignUp from "../components/Auth/SignUp"

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleFormToggle = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <Grid item xs={12} sm={7} md={5} lg={4} className="app">
      <Grid container item xs={12} sm={7} md={5} lg={4} className='flex flex-col justify-center gap-10'>
        <div className="p-3 md:p-0 pt-3 w-full flex flex-col items-center justify-center">
          <span>Test Email: <b>johndoe@test.com</b></span>
          <span>Test Password: <b>password</b></span>
        {
          isSignIn ? 
            <SignIn>
              <Typography position="relative" className="flex">
                <span>No account yet? &nbsp;</span>
                <Link component="button" underline="none" onClick={handleFormToggle}>Sign Up</Link>
              </Typography>
            </SignIn>
          : 
            <SignUp>
              <Typography position="relative" className="flex">
                <span>Already have an account? &nbsp;</span>
                <Link component="button" underline="none" onClick={handleFormToggle}>Sign In</Link>
              </Typography>
            </SignUp>
        }
        </div>
        <div className="w-full flex flex-col gap-3 bg-primary  text-center px-3 py-5">
            <span className="font-bold w-full block">Terms and Conditions</span>
            <Typography>
              Please be advised that our application is currently in a developmental stage. 
              As part of this development process, we reserve the right to delete any posts 
              and associated media without prior notice. 
            </Typography>
            <Typography>
              By using this application, you acknowledge and agree to this policy. 
              We appreciate your understanding and cooperation as we work towards improving our services.
            </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default Auth