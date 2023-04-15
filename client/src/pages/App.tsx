import { Grid } from '@mui/material'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Body from '../components/Body'

function App() {
  return (
    <Grid item xs={12} sm={7} md={5} lg={4} className="app">
      <Header />
      <Body />
      <Footer />
    </Grid>
  )
}

export default App
