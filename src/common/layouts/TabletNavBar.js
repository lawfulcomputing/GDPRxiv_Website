import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TabletNavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const navigateToData = () => navigate("/");
  const navigateToMethod = () => navigate("/methodology");
  const navigateToFinidng = () => navigate("/findings");
  const navigateToAbout = () => navigate("/about");
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
        <Grid container xs={10}>
          <Grid item alignSelf="center" paddingX="10px">
            <Typography fontWeight='bold' variant="h5">GDPRxiv</Typography>
          </Grid>
        </Grid>
        <Grid container xs={1} >
          <Grid item alignSelf="center">
            <IconButton aria-label="menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{ style: { backgroundColor: "#FFCD00" } }}
            >
              <MenuItem
                onClick={() => {
                  navigateToData();
                  handleClose();
                }}
              >
                Enforcement Database
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigateToFinidng();
                  handleClose();
                }}
              >
                Findings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigateToMethod();
                  handleClose();
                }}
              >
                Methodology
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigateToAbout();
                  handleClose();
                }}
              >
                About
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TabletNavBar;
