import {Grid, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Footer() {
  return (
    <Grid container justifyContent="center" position="absolute" bottom={20}>
      <Grid item xs={12} lg={8} container justifyContent="end" alignItems="end" position="relative" right={20}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  )
}
