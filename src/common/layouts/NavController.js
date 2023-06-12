import { useTheme, useMediaQuery } from "@mui/material";
import TabletNavBar from "./TabletNavBar";
import DesktopNavBar from "./DesktopNavBar";

const NavController = () => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <>
            {isTablet ? <TabletNavBar/> : <DesktopNavBar/>}
        </>
    )
}

export default NavController