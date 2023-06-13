import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DesktopNavItem = ({ name, location, active }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/${location}`);
  };

  return (
    <>
      <Grid item sx={{ paddingX: "10px" }}>
        <Button
          aria-label={name}
          sx={{ color: "black", borderColor: 'black' }}
          variant={active ? 'outlined' : 'text'}
          onClick={handleClick}
        >
          {name}
        </Button>
      </Grid>
    </>
  );
};

export default DesktopNavItem;
