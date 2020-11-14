import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Rating from "@material-ui/lab/Rating";

const ShowDot = ({name, value, max}) => {
    return (<Rating
        readOnly
        name={name}
        value={value}
        max={max || 5}
        icon={<Brightness1Icon/>}
    />)
}

export default ShowDot;
