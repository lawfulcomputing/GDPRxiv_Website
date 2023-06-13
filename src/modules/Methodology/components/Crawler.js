import { Grid, Divider, Typography, Box, Button } from "@mui/material";

import ArchImg from "../assets/architecture.webp";

const Crawler = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: "60%" }}
      marginBottom="3vw"
    >
      <Grid item xs={12} textAlign="center" marginBottom="3vw">
        <Divider />
        <Typography variant="h5">
          GDPRxiv: Crawler and Archival System
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" marginBottom="3vw">
          <Grid item xs={12} md={5}>
            <Typography variant="body1">
              The figure shows the system architecture of GDPRxiv. It has five
              key components: (i) a{" "}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
              >
                policy engine
              </Box>{" "}
              that specifies crawl configurations like source list, crawling
              frequency, and status of crawled documents, (ii) a{" "}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
              >
                download engine
              </Box>{" "}
              that implements HTML parsing, URL extraction, and document
              downloading, (iii) a{" "}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
              >
                data curator
              </Box>{" "}
              that filters out non-GDPR documents, classifies files by type, and
              translates them to English, (iv) a{" "}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
              >
                file manager
              </Box>{" "}
              that administers the enforcement repo including low-level access
              to files, and finally (v) a{"  "}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
              >
                run-time system
              </Box>{" "}
              that manages cloud infrastructure, inter-component communications,
              and error handling.
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <img
              src={ArchImg}
              alt="Flow chart of the crawler architechure"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            We intend GDPRxiv to be used as a first source of GDPR information
            by the computing community. To facilitate this, we are building a
            search-based interface to the enforcement corpora along with options
            to filter the results by country, GDPR articles, penalty level, and
            other labels. If you would like an early access to this system, or
            the entire corpora in the original format, please contact us.
          </Typography>
        </Grid>
      </Grid>
      <Grid item alignItems="center" marginTop="3vw">
        <Button xs={12} variant="contained" disabled>
          {" "}
          GDPRxiv SOTA Explorer
        </Button>
      </Grid>
    </Grid>
  );
};

export default Crawler;
