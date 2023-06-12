import { Grid, Typography, Divider, Link, Box } from "@mui/material";
import ModelImg from "../assets/model.webp";
const Models = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: "60%" }}
      marginBottom="3vw"
    >
      <Grid item xs={12} textAlign="center" marginBottom="3vw">
        <Divider />
        <Typography variant="h5">Modeling the GDPR Ecosystem</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          marginBottom="3vw"
        >
          <Grid item xs={12} md={4}>
            <Typography variant="body1">
              We analyze GDPR’s enforcement ecosystem in Europe with a goal to
              identify all the sources that generate enforcement information,
              and to design a way to procure this information via automated
              means. The figure depicts (i) the parliaments of EU and member
              states, who pass GDPR regulations/amendments, (ii) the Data
              Protection Authorities (DPAs), who implement the GDPR on the
              ground, (iii) the judicial system that interprets the law, and
              (iv) the EDBP that ensures consistency in GDPR enforcement across
              nations.
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <img
              src={ModelImg}
              alt="Process of our models"
              style={{ maxWidth: "100%", height: "auto", border: 'solid #FFCD00 3px' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginBottom="2vw">
        <Typography variant="body1">
          We observe that two broad categories of legal content are generated:
          (i){" "}
          <Box component="span" fontWeight="fontWeightBold">
            legal precedent,{" "}
          </Box>
          which is a principle, practice, or rule that gets established
          following a DPA decision or a court judgement such that subsequent
          cases with similar situation will likely follow the previously
          established outcome, and (ii){" "}
          <Box component="span" fontWeight="fontWeightBold">
            legal guidance,{" "}
          </Box>
          which are recommendations, opinions, and reports issued by GDPR bodies
          to help stakeholders and to clarify compliance matters without being
          binding.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">
          GDPR, via articles 57, 59, and 70, requires DPAs and EDPB to make the
          aforementioned documents available to the public. Though the law does
          not mandate using the Internet as a platform for sharing such data, in
          practice, we have seen all these agencies embrace the electronic
          format and posting content on their websites. Based on this, we have
          compiled the complete set of official sources and links that would
          produce SOTA-defining documents:{" "}
          <Link
            href="https://www.gdprxiv.org/_files/ugd/13b079_7668ee3315b84307a44ce177991d3604.csv"
            variant="h6"
            underline="none"
          >
            our crawl list.
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Models;
