import { Divider, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";

import gdprCountry from '../assets/gdprByCountry.webp';
import gdprYear from '../assets/gdprByYear.webp'

const Section1 = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth:  isPhone ? "100%" : '60%'}}
      marginBottom='3vw'
    >
      <Grid item xs={12} textAlign="center">
        <Divider />
        <Typography variant="h5">
          1. GDPR enforcements across nations and over time
        </Typography>
        <Divider />
        <br/>
        <Typography variant="caption">
          Figure on the left shows the distribution of SOTA documents across the
          nations (at the same time, comparing the size of GDPRxiv corpus
          against prior work i.e., Enforcement Tracker). We see that the top
          three DPAs account for 54% of all GDPR enforcements, while the bottom
          half only add up to 10%.
        </Typography>
        <br/>
        <br></br>
        <Typography variant="caption">
          Figure on the right indicates how GDPR enforcements are increasing
          over the years. Each line representing a DPA and if a DPA has more
          enforcements in each of the years 2, 3, and 4 compared to year-1, it
          is plotted in blue. We see that two-thirds of the DPAs have expanded
          on their GDPR activities over the years. In raw numbers, year-1 saw a
          total of 275 enforcements, year 2 through 4 had 663, 1021, and 1012
          enforcements respectively (resulting in a 2.7× increase over four
          years).
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop='2vw' alignSelf='center' >
        <Grid container direction='row'  alignItems='center'>
            <Grid item xs={12} md={6}>
                <img src={gdprCountry} alt="GDPR data by country" style={{ maxWidth: '100%', height: 'auto', border: 'solid #FFCD00 2px'}}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <img src={gdprYear} alt="GDPR data by year" style={{ maxWidth: '100%', height: 'auto', border: 'solid #FFCD00 2px'}}/>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Section1;
