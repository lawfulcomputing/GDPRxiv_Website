import { Grid, Typography } from "@mui/material";

const Researcher = ({ photo, name, position, school }) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingY: "10px" }}
      >
        <Grid item xs={12}>
          <img
            src={photo}
            alt={`head shot of ${name} `}
            style={{
              border: "5px solid #FFCD00",
              borderRadius: "100%",
              boxShadow: "0.00px 0.00px 14px 0px rgba(0,0,0,0.2)",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{position}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{school}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Researcher;
