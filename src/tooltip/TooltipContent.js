import {Typography} from "@material-ui/core";
import {ucfirst} from "../StringUtils";
import Theme from "../Theme";
import React from "react";

const TooltipContent = ({data}) => (<>
    <Typography style={{fontWeight:"bold"}}>{ucfirst(data ? data.name : 'none')}</Typography>
    {data && data.description1 && <Typography style={{fontSize:Theme.typography.pxToRem(12), marginBottom:Theme.spacing(1)}} dangerouslySetInnerHTML={{__html: data ? data.description1 : 'none'}} />}
    {
        data && data.dots.length > 0 && [
            '•',
            '••',
            '•••',
            '••••',
            '•••••',
        ].map((dots, index) => (
            <Typography style={{fontSize:Theme.typography.pxToRem(12), marginBottom:Theme.spacing(1)}} key={index} dangerouslySetInnerHTML={{__html: `${dots}: ${data.dots[index]}`}} />
        ))
    }
    {data && data.note && <Typography style={{fontSize:Theme.typography.pxToRem(12)}} dangerouslySetInnerHTML={{__html: `<em>NB</em>: ${data.note}`}} />}
</>);

export default TooltipContent;