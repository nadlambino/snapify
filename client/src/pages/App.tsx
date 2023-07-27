import { Grid } from '@mui/material'
import Header from './../components/Header'
import Body from '../components/Body'

function App() {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center gap-2">
      <Header />
      <Body />
    </div>
  )
}

export default App
