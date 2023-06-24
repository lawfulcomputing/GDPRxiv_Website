import { Grid, Typography } from "@mui/material";

import DesktopNavItem from "./DesktopNavItem";
import { useLocation } from "react-router-dom";

const DesktopNavBar = () => {
  const location = useLocation().pathname;
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        backgroundColor="#FFCD00"
        paddingY="15px"
        paddingX="10px"
        width="100%"
      >
        <Grid container xs={3}>
          <Grid item alignSelf="center" paddingX="10px">
            <Typography fontWeight='bold' variant="h5">GDPRxiv</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          xs={9}
          justifyContent="flex-end"
          alignContent="center"
        >

          <DesktopNavItem
            name={"Enforcement Database"}
            location={""}
            active={location === "/"}
          />
          {/* <DesktopNavItem
            name={"Findings"}
            location={"findings"}
            active={location === "/findings"}
          />
          <DesktopNavItem
            name={"Methodology"}
            location={"methodology"}
            active={location === "/methodology"}
          /> */}
          <DesktopNavItem
            name={"About"}
            location={"about"}
            active={location === "/about"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopNavBar;
