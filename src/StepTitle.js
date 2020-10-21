import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {capitalMiniature} from "./StringUtils";

const StepTitle = ({children}) => (
    <Box m={6}>
        <Typography
            align={'center'}
            variant={'h3'}>
            {capitalMiniature(children)}
        </Typography>
    </Box>
)

export default StepTitle;
