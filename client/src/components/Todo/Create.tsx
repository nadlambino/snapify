import { Grid, TextField } from "@mui/material"

export default function Create() {

  return (
        <Grid container gap={2} padding={3}>
          <Grid item xs={12}>
            <TextField id="standard-basic" label="Title" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              variant="standard"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
  )
}
