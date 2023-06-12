import { Divider, Grid, Typography } from "@mui/material";

const Title = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: "60%" }}
      marginBottom="5vw"
    >
      <Grid item xs={12} paddingY="5vw">
        <Typography variant="body1">
          Our analysis of the enforcement corpora has brought out several novel
          insights about GDPR enforcement activities, priority areas, and
          financial penalties. The table below provides a concise summary of
          these findings. While four years is a short time to judge the
          efficacies of a transformative regulation like GDPR, our findings do
          reflect that its enforcements are broadly aligned with its original
          intent:
        </Typography>
      </Grid>
      <Grid item xs={12} bgcolor="#FFCD00" padding="20px" marginBottom="5px">
        <Grid container direction="row">
          <Grid item md={4} xs={12}>
            <Typography variant="h4">Activities</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">
              GDPR is not implemented uniformly across Europe.
            </Typography>
            <Typography variant="body1">
              Three countries (ESP, DNK, POL) account for 54% of all GDPR
              enforcements.
            </Typography>
            <Divider />
            <Typography variant="h6">
              GDPR are issued frequently and are growing over time.
            </Typography>
            <Typography variant="body1">
              On average, 2 enforcement decisions are issued every day.
            </Typography>
            <Typography variant="body1">
              Year-4 saw 2.7× more enforcement decisions than year-1.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} bgcolor="#ffe066" padding="20px" marginBottom="5px">
        <Grid container direction="row">
          <Grid item md={4} xs={12}>
            <Typography variant="h4">Penalties</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">
              Proportional penalty has resulted in a heavy skew in the
              application of fines.
            </Typography>
            <Typography variant="body1">
              80% of the fines were for €10K or less, and only 1.8% violators
              ended up with Million € fines.
            </Typography>
            <Typography variant="body1">
              Three countries (LUX, IRL, FRA) are responsible for 83% of all
              GDPR fines.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} bgcolor="#fff0b3" padding="20px">
        <Grid container direction="row">
          <Grid item md={4} xs={12}>
            <Typography variant="h4">Focus Areas</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">
              Regulators are prioritizing sound and secure practices of data
              management over reports of data breaches or failures to honor an
              individual’s rights.
            </Typography>
            <Typography variant="body1">
              Three articles (5, 6, 32) account for nearly 50% of all citations.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" paddingTop="3vw">
          Below, we expand on our experiments and analyses that yielded these
          high-level insights. The dataset, scripts, and software used in
          generating these graphs will be made public after our work goes
          through the peer-review process.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Title;
