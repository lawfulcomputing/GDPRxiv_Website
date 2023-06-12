import { Grid, Typography } from "@mui/material";

import iowaLogo from "../../assets/Block-IOWA-BLACK.png";
import DesktopNavItem from "./DesktopNavItem";

const DesktopNavBar = () => {

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
          <Grid item>
            <img src={iowaLogo} alt="Iowa logo" style={{ width: "100px" }} />
          </Grid>
          <Grid item alignSelf='center' paddingX='10px'>
            <Typography variant="h5">GDPRxiv</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          xs={9}  
          justifyContent="flex-end"
          alignContent='center'
        >
          <DesktopNavItem name={"Enforcement Database"} location={""}/>
          <DesktopNavItem name={"Findings"} location={"findings"}/>
          <DesktopNavItem name={'Methodology'} location={'methodology'}/>
          <DesktopNavItem name={"About"} location={'about'}/>
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopNavBar;
