import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: '50px',
    },
    logo_tipo: {
        height: '50px',
    }
}));

const Header = ({data, logout, setOpenLoginDialog, setOpenRegisterDialog}) => {

    const classes = useStyles();

    return (<>
        <AppBar position="fixed">
            <Toolbar>
                <IconButton href='/' edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img className={classes.logo} src="/images/logo.png"/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <img className={classes.logo_tipo} src="/images/logo_tipo.png"/>
                </Typography>
                {
                    !data && <Button className={classes.menuButton} color="primary" variant="outlined" onClick={() => setOpenLoginDialog(true)}>
                        <AccountBoxIcon/> Login
                    </Button>
                }
                {
                    !data && <Button className={classes.menuButton} color="primary" variant="outlined" onClick={() => setOpenRegisterDialog(true)}>
                        <LockOpenIcon/> Registrati
                    </Button>
                }
                {data && <>
                    <Typography variant={"subtitle2"} color={"primary"}>
                        Ciao {data.email}
                    </Typography>
                    <Tooltip title="Logout" placement={"bottom"} arrow>
                        <IconButton color="primary" variant="outlined" onClick={() => logout()}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Tooltip>
                </>}
            </Toolbar>
        </AppBar>
    </>)
}

export default Header;
