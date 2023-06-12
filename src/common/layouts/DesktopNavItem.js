import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DesktopNavItem = ({name, location}) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item sx={{ paddingX: "10px" }}>
        <Button
          aria-label="Fine Database"
          sx={{ color: "black" }}
          variant="text"
          onClick={() => navigate(`/${location}`)}
        >
          {name}
        </Button>
      </Grid>
    </>
  );
};

export default DesktopNavItem;
