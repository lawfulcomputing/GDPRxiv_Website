import { Grid } from '@mui/material';
import NavController from '../../common/layouts/NavController'
import Title from './components/Title';
import Models from './components/Models';
import Crawler from './components/Crawler';
import Footer from '../../common/layouts/Footer';

const Methodology = () => {
    return (
        <>
            <NavController/>
            <Grid container direction='column'  alignItems='center'>
                <Title/>
                <Models/>
                <Crawler/>
            </Grid>
            <Footer/>
        </>
    )
}

export default Methodology;