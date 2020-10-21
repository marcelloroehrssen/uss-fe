import InvisibileRadio from "./InvisibleRadio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import clsx from "clsx";
import {withStyles} from "@material-ui/core";

const StyledBoxedControlLabel = withStyles((theme) => ({
    label: {
        width: '100%'
    }
}))(FormControlLabel)

const BoxedControlLabel = ({value, label, selected, disabled, props}) => {
    return (<StyledBoxedControlLabel
        {...props}
        className={clsx('BoxedControlLabel', selected ? 'selected' : '', disabled ? 'disabled' : '')}
        value={value}
        control={<InvisibileRadio/>}
        label={<>{label}</>}
    />)
}

export default BoxedControlLabel;
