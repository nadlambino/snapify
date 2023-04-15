import { Grid, Button, Paper } from "@mui/material"
import FCWithProps from '../../types/FCWithProps'
import { createPost } from "../../api/post"
import Dropzone from "../Reusable/Dropzone"

const Create: React.FC<FCWithProps> = (props) => {

  return (
    <Grid container gap={2} padding={1} justifyContent="center">
      <Dropzone />
    </Grid>
  )
}

export default Create