import { Grid } from '@mui/material';
import NavController from '../../common/layouts/NavController'
import Title from './components/Title';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
const Finidngs = () => {
    return (
        <>
            <NavController/>
            <Grid container direction='column'  alignItems='center'>
                <Title/>
                <Section1/>
                <Section2/>
                <Section3/>
            </Grid>
        </>
    )
}

export default Finidngs;