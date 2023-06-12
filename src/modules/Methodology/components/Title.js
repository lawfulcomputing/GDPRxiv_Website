import { Grid, Typography } from "@mui/material";

const Title = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ maxWidth: "60%" }}
        marginBottom="5vw"
      >
        <Grid item xs={12} paddingY="4vw">
          <Typography variant="body1">
            <Typography
              variant="h6"
              component="span"
              sx={{ fontStyle: "italic" }}
            >
              General Data Protection Regulation (GDPR)
            </Typography>{" "}
            has been in effect since May 2018. It was the first major law to
            elevate the privacy and protection of personal data to be a
            fundamental right. Since then, GDPR has emerged as a model
            regulation for data protection efforts around the world. Despite its
            outsized influence on data protection debates and policies around
            the world, details of its enforcement are not well understood. For
            example, there is no comprehensive repository of all the GDPR
            rulings, judgements, advisories, reports, and guidances; nor have
            there been any systematic analysis of its enforcement trends;
            instead, much of the focus has been on big monetary penalties levied
            on popular companies.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            To alleviate this situation, we propose establishing the{"  "}
            <Typography
              variant="h6"
              component="span"
              sx={{ fontStyle: "italic" }}
            >
              State of the Art (SOTA) in GDPR enforcement.
            </Typography>{" "}
            We define GDPR SOTA to be a set of technologies, designs,
            mechanisms, configurations, and operational practices that have
            failed to pass the current legal standards of GDPR compliance. Most
            scientific and legal disciplines require having a clear
            understanding of what the state of the art is at any given time.
            Thus, the goal of our work is to build such a knowledge base and
            make it available to the computing community.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Title;
