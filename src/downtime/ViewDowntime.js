import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Box, Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {ucfirst} from "../StringUtils";

const ViewDowntime = ({currentDowntime, onClose, onEdit, children}) => (
    <Dialog open={currentDowntime !== null} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography={true}>
            <Typography variant="subtitle1">{ucfirst(currentDowntime.name)}</Typography>
        </DialogTitle>
        <DialogContent>
            <Typography variant="caption">Definizione associata
                (<strong>{currentDowntime.downTimeDefinition.name}</strong>)</Typography>
            <Typography paragraph
                        component={Box}
                        dangerouslySetInnerHTML={{__html: currentDowntime.downTimeDefinition.description}}/>
            <Typography variant="caption">Descrizione</Typography>
            <Typography paragraph>
                {(currentDowntime.description === null || currentDowntime.description === '') ? "non hai fornita una descrizione specifica per questa azione" : currentDowntime.description}
            </Typography>
            <Typography variant="caption">Oggetti associati</Typography>
            {children}
            {
                currentDowntime.resolution !== null
                && currentDowntime.resolution !== ''
                && <>
                    <Typography paragraph>&nbsp;</Typography>
                    <Typography variant="caption">Risoluzione</Typography>
                    <Typography paragraph component={Box}
                                dangerouslySetInnerHTML={{__html: currentDowntime.resolution}}/>
                </>
            }
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={onClose}>Chiudi</Button>
            { (currentDowntime.resolution === null || currentDowntime.resolution === '') &&
            <Button color="primary" variant={"outlined"} onClick={onEdit}>Modifica</Button>}
        </DialogActions>
    </Dialog>
)

export default ViewDowntime;
