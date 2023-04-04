import { Grid, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material"

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
        <FormControl>
          <FormLabel id="status">Status</FormLabel>
          <RadioGroup row  aria-labelledby="status" name="row-radio-buttons-group">
            <FormControlLabel value={0} control={<Radio />} label="To do" />
            <FormControlLabel value={1} control={<Radio />} label="Doing" />
            <FormControlLabel value={2} control={<Radio />} label="Done" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}
