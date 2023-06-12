import { Grid, Divider, Typography } from "@mui/material";

import FinesInEuros from '../assets/FinesInEuros.webp'
import IssueByCountry from '../assets/IssueByCountry.webp'
const Section2 = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: "60%" }}
      marginBottom="3vw"
    >
      <Grid item xs={12} textAlign="center">
        <Divider />
        <Typography variant="h5">2. GDPR financial penalties</Typography>
        <Divider />
        <br />
        <Typography variant="caption">
          Our dataset indicates that there have been a total of 3343 enforcement
          decisions over the last 4.5 years, which translate to 2.03
          enforcements per day on average. The graph (on the left) shows the
          distribution of penalties by their penalty ranges (as measured in €).
          We see that 46% of enforcements carried no financial penalties at all,
          and in 80% of the cases, the penalties did not exceed €10K. Million
          Euro penalties were levied on less than 2% of violators, a reflection
          of GDPR's proportional penalty being put into effect.
        </Typography>
        <br />
        <br></br>
        <Typography variant="caption">
          Figure (on the right) shows the EU countries (sorted by their total
          fine amount) and stacked to represent the EU-wide total of €1.87B. We
          see a heavy skew with the top-3 countries accounting for more than 80%
          of all GDPR fines. In fact, the bottom half of the countries have
          collectively issued a fine of €12.5M, which is less than 1% of the
          EU-wide total.
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop="2vw" alignContent="center">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={FinesInEuros} alt="Fines in Euros" style={{ maxWidth: '100%', height: 'auto', border: 'solid #FFCD00 3px'}}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={IssueByCountry} alt="Issue by counties" style={{ maxWidth: '100%', height: 'auto', border: 'solid #FFCD00 3px'}}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Section2;
