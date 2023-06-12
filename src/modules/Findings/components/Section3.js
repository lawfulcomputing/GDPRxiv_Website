import { Grid, Divider, Typography } from "@mui/material";

import FineByArt from '../assets/FinePerArt.webp'

const Section3 = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: "60%" }}
      marginBottom="3vw"
    >
      <Grid item xs={12} textAlign="center" >
        <Divider />
        <Typography variant="h5">
          3. Areas of focus in GDPR enforcement
        </Typography>
        <Divider />
        <br />
        <Typography variant="caption">
          The goal of this analysis was to identify the areas of focus by
          tracking the GDPR articles cited in enforcements. The heatmaps
          represent each of the 99 articles as boxes with each box being colored
          in proportion to the number of times the corresponding article is
          cited. We see that there is a heavy skew with articles 5, 6, and 32
          such that at least one of them appears in 78.5% of all citations. The
          focus on these articles conveys the importance that regulator are
          placing on sound data management practices starting from how personal
          data is to be procured (5), how it is to be processed (6), and how the
          security infrastructure is to be designed and operated (32).
        </Typography>
      </Grid>
      <Grid item  marginTop="2vw" alignSelf="center" >
        <Grid container direction="row" alignItems="center" >
          <Grid item  minWidth='250px'>
            <img src={FineByArt} alt="Fines per article" style={{ maxWidth: '100%', height: 'auto', border: 'solid #FFCD00 3px'}}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Section3;
