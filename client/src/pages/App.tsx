import { Grid } from '@mui/material'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Body from '../components/Body'

function App() {
  return (
    <Grid container direction="column" alignItems="center" item xs={12} sm={7} md={5} lg={4} margin="auto" padding={2} className="App">
      <Header />
      <Body />
      <Footer />
    </Grid>
  )
}

export default App
