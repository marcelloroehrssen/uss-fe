import {HtmlTooltip} from "./AppTooltip";
import {Typography} from "@material-ui/core";
import {ucfirst} from "../StringUtils";
import Theme from "../Theme";
import React from "react";
import {ColoredBadge} from "../../pages/downtime";

const getDotsLabel = (count) => {
    const labels = [];
    for (const i in [...Array(count).keys()]) {
        labels.push('•'.repeat(parseInt(i)+1))
    }
    return labels;
}

const ItemTooltip = ({item, color, additional, children}) => (
    <HtmlTooltip title={<>
        <Typography style={{fontWeight: "bold"}}>
            {ucfirst(item.name)}
            <small>{item.isConsumable ? '(consumabile)' : ''}</small>
        </Typography>
        <Typography paragraph style={{
            fontSize: Theme.typography.pxToRem(12),
            marginBottom: Theme.spacing(1)
        }} dangerouslySetInnerHTML={{__html: item.description}} />
        <Typography style={{fontSize: Theme.typography.pxToRem(12)}}>
            <strong>Pallini:</strong> {'•'.repeat(parseInt(item.dots))}
        </Typography>
        <Typography style={{fontSize: Theme.typography.pxToRem(12)}}>
            <strong>Punti oggetto:</strong> {item.value}
        </Typography>
        {additional && <Typography style={{
            fontSize: Theme.typography.pxToRem(12),
            marginBottom: Theme.spacing(1)
        }}>
            <strong>Nota</strong>: {additional}
        </Typography>}
    </>}>
        <ColoredBadge color={color}
                      badgeContent=" "
                      overlap="circle"
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                      }}>
            {children}
        </ColoredBadge>
    </HtmlTooltip>
)

export default ItemTooltip;
