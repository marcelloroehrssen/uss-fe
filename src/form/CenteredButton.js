import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import {withStyles} from "@material-ui/core";
import Theme from "../Theme";

const StyledButton = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        clipPath: 'polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0 50%, 20px 0%)',
        width: '50%',
        fontFamily: 'Times New Roman',
        boxShadow: 'inset 0 0 20px 0 black',
        fontSize: theme.typography.pxToRem(20),
        textShadow: '2px 2px 0 black',
        background: 'red',
        transition: 'all .5s',
        '&:hover': {
            background: 'black',
        }
    }
}))(Button)



const CenteredButton = ({children, semiCondensed, condensed, ...props}) => (
    <Box
        mt={semiCondensed ? '16px' : condensed ? 0 : Theme.spacing(1)}
        align={'center'}>
        <StyledButton {...props} style={{}}>
            {children}
        </StyledButton>
    </Box>
)

export default CenteredButton;
