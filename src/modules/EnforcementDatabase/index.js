import { Grid, Typography } from "@mui/material";
import NavController from "../../common/layouts/NavController";
import DataTable from "./components/DataTable";
import Footer from "../../common/layouts/Footer";

const EnforcementDatabase = () => {

  return (
    <div style={{backgroundColor: '#EEEBEB'}}>
      <NavController />
      <Grid container direction="column" alignItems="center">
        <Grid item padding="20px" alignSelf='center'>
          <Typography variant="h4">Enforcement Database</Typography>
        </Grid>
          <DataTable />
          <Footer/>
      </Grid>
    </div>
  );
};

export default EnforcementDatabase;
