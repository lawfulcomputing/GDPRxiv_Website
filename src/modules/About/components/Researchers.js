import { Grid } from "@mui/material";
import Researcher from "./Researcher";
import supreethImg from '../assets/Supreeth.webp'
import andrewImg from '../assets/andrew.webp'
import chenImg from '../assets/chen-sun.webp'
import danielImg from '../assets/Daniel.webp'
import evanImg from '../assets/evan-jacobs.webp'
import dylanImg from '../assets/dylan-fair.webp'
import venyaImg from '../assets/venya.webp'

const Researchers = () => {
    return (
        <>
            <Grid container direction='row' justifyContent='space-evenly'>
                <Grid item xs={12} md={4} >
                    <Researcher photo={supreethImg} name={"Supreeth Shastri"} position={"Assistant Professor of CS"} school={"University of North Texas"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={andrewImg} name={"Andrew Crouse"} position={"Associate Professor of Law"} school={"University of Iowa"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={chenImg} name={"Chen Sun"} position={"Doctoral Researcher"} school={"University of Iowa"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={venyaImg} name={"Venya Durgam"} position={"Doctoral Researcher"} school={"University of North Texas"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={danielImg} name={"Daniel Lehmann"} position={"Undergraduate Researcher"} school={"University of Copenhagen"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={evanImg} name={"Evan Jacobs"} position={"Undergraduate Researcher"} school={"University of Iowa"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Researcher photo={dylanImg} name={"Dylan fair"} position={"Undergraduate Researcher"} school={"University of Iowa"}/>
                </Grid>
            </Grid>
        </>
    )
}


export default Researchers;
