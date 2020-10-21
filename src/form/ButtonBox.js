import Paper from "@material-ui/core/Paper";
import React, {useEffect, useReducer, useRef} from "react";
import Box from "@material-ui/core/Box";

const ButtonBox = ({selected, disabled, children, onClick, ...props}) => {

    const ref = useRef(null);
    const [currentState, dispatch] = useReducer((state, action) => {
        if (selected) return 5;
        if (disabled) return 0;
        switch (action) {
            case 'enter':
                return 3;
            case 'select':
                return 5;
            case 'leave':
            case 'disable':
            case 'deselect':
            default:
                return 0;
        }
    }, selected ? 5: 0);

    const activeStyle = {cursor:"pointer", backgroundColor:'#ffffff', color:'#000000'};
    const disabledStyle = {cursor:"not-allowed", backgroundColor:'#cccccc', color:'#666666'};

    useEffect(() => dispatch('deselect'), [selected]);
    useEffect(() => dispatch('disable'), [disabled]);

    const handleClick = e => {
        if (disabled) return;
        dispatch(selected)
        return onClick(e);
    }

    return (
        <Paper {...props}
               ref={ref}
               elevation={currentState}
               p={2}
               style={!selected && disabled ? disabledStyle : activeStyle}
               component={Box}
               onMouseEnter={() => dispatch('enter')}
               onMouseLeave={() => dispatch('leave')}
               onClick={handleClick}>
            {children}
        </Paper>
    );
}

export default ButtonBox;
