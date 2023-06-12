import { Grid, Typography } from "@mui/material";
import NavController from "../../common/layouts/NavController";
import DataTable from "./components/DataTable";

const EnforcementDatabase = () => {
  return (
    <>
      <NavController />
      <Grid container direction="column" alignItems="center">
        <Grid item padding="20px" alignSelf='center'>
          <Typography variant="h4">Enforcement Database</Typography>
        </Grid>
          <DataTable />
      </Grid>
    </>
  );
};

export default EnforcementDatabase;
