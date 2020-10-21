import Typography from "@material-ui/core/Typography";
import Theme from "./Theme";
import React from "react";

const DescriptedSurface = ({
       name,
       description1, description1Style, description1Component,
       description2, description2Style, description2Component,
       description3, description3Style, description3Component,
       footer}) => (<>
    <Typography variant={'h6'}>{name}</Typography>
    {description1 && <Typography component={description1Component ?? 'p'}
                                 style={{fontSize: Theme.typography.pxToRem(12), ...description1Style}}>{description1}</Typography>}
    {description2 && <Typography component={description2Component ?? 'p'}
                                 style={{fontSize: Theme.typography.pxToRem(14), ...description2Style}}>{description2}</Typography>}
    {description3 && <Typography component={description3Component ?? 'p'}
                                 style={{fontSize: Theme.typography.pxToRem(12), ...description3Style}}>{description3}</Typography>}
    {footer}
</>)

export default DescriptedSurface;
