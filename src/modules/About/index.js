import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import NavController from "../../common/layouts/NavController";
import Researchers from "./components/Researchers";
import Footer from "../../common/layouts/Footer";

const About = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <NavController />
      <Grid
        container
        direction="column"
        padding="20px"
      >
        <Grid
          container
          direction="row"
          padding="20px"
          paddingBottom="6vw"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h6" textAlign="center">
              Our goal is to make it easy to understand and comply with
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              color="#004494"
              paddingBottom="40px"
            >
              Data Protection Regulations
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: isTablet ? "center" : "none" }}
          >
            <Typography variant="body1" fontFamily="sans-serif">
              We are an interdisciplinary team of researchers, exploring GDPR
              and other data protection regulations from a computer systems
              perspective. The goal of this project is to understand how GDPR is
              enforced in the field, and make that knowledge available to the
              computing community.
            </Typography>
            <br></br>
            <Typography variant="body1">
              If this interests you, we would love to hear from you! We are
              seeking early-stage adapters of our research; legal scholars and
              computing researchers interested in collaborating; and
              organizations open to sponsoring our work.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Researchers />
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default About;
