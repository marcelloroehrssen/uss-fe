import Tooltip from '@material-ui/core/Tooltip';
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TooltipContent from "./TooltipContent";

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: 420,
        fontSize: theme.typography.pxToRem(12),
        border: '5px double black',
        background: '#333',
        color: '#999',
        borderRadius: 0,
        boxShadow: '5px 5px 5px 0px rgba(33,33,33, .7)'
    },
}))(Tooltip);

const getSkill = (availableSkills, skill) => availableSkills.filter(s =>  s.name.toLowerCase() === skill.toLowerCase().replace(/_[0-9]+$/,'')).pop();

const AppTooltip = ({availableData, data, children, ...props}) => (
    <HtmlTooltip {...props} title={<TooltipContent data={getSkill(availableData, data)} />}>{children}</HtmlTooltip>
)

export default AppTooltip;
