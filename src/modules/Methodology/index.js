import { Grid } from '@mui/material';
import NavController from '../../common/layouts/NavController'
import Title from './components/Title';
import Models from './components/Models';
import Crawler from './components/Crawler';

const Methodology = () => {
    return (
        <>
            <NavController/>
            <Grid container direction='column'  alignItems='center'>
                <Title/>
                <Models/>
                <Crawler/>
            </Grid>
        </>
    )
}

export default Methodology;