import {Radio, withStyles} from "@material-ui/core";

const InvisibileRadio = withStyles(() => ({
    root: {
        visibility: "hidden",
        width: 0,
    }
}))(Radio)

export default InvisibileRadio;
