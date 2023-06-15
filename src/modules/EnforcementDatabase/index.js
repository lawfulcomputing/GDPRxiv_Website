import { Grid, Typography } from "@mui/material";
import NavController from "../../common/layouts/NavController";
import DataTable from "./components/DataTable";
import Footer from "../../common/layouts/Footer";
import teamLogo from "../../assets/uiowaResearchLogo.png";

const EnforcementDatabase = () => {
  return (
    <div style={{ backgroundColor: "#EEEBEB" }}>
      <NavController />
      <Grid container direction="column" alignItems="center">
        <Grid container direction="row"  sx={{ maxWidth: '80%', marginTop: '20px'}}>
          <Grid item md={1}>
          </Grid>
          <Grid item xs={12} md={2} textAlign='center'>
            <img
              src={teamLogo}
              alt="University of Iowa Lawful computing research logo"
              width="100px"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body2" paddingLeft='5px'>
              <Typography variant="h6" component='span'>
              GDPRxiv
              </Typography>{" "}
               (a portmanteau of GDPR + arXiv, pronounced as
              G-D-P-archive) is an open-source information archival system that
              collects and curates GDPR enforcements, judgements, opinions,
              reports, and guidances from all official GDPR sources. We welcome
              you to learn more about our research, browse our source code,
              download the entire corpora, or simply explore the enforcement
              viewer below. The current view reflects all the enforcements
              between 25-May-2018 and 24-Nov-2022.
            </Typography>
          </Grid>
        </Grid>
        <Grid item padding="20px" textAlign='center'>
          <Typography variant="h4">Enforcement Database</Typography>
        </Grid>
        <DataTable />
        <Footer />
      </Grid>
    </div>
  );
};

export default EnforcementDatabase;
