import { Grid, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material"

export default function Create() {

  return (
    <Grid container gap={2} padding={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <TextField label="Emoji" variant="outlined" fullWidth type="emoji"/>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={8}>
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
