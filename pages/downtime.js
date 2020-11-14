import React, {useState} from "react";
import AppContainer from "../src/layout/AppContainer";
import useSWR from "swr";
import StepTitle from "../src/layout/StepTitle";
import Grid from "@material-ui/core/Grid";
import {Box, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Theme from "../src/Theme";
import {ucfirst} from "../src/StringUtils";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {HtmlTooltip} from "../src/tooltip/AppTooltip";
import Badge from "@material-ui/core/Badge";
import withStyles from "@material-ui/core/styles/withStyles";
import CenteredButton from "../src/form/CenteredButton";
import Button from "@material-ui/core/Button";
import {Skeleton} from "@material-ui/lab";
import ViewDowntime from "../src/downtime/ViewDowntime";
import CreateDowntime from "../src/downtime/CreateDowntime";
import ItemTooltip from "../src/tooltip/ItemTooltip";
import {describe} from "../src/downtime/describe";
import {showImage} from "../src/downtime/ShowImage";

export const ColoredBadge = withStyles((theme) => ({
    colorPrimary: {
        backgroundColor: '#008600'
    },
    colorSecondary: {
        backgroundColor: '#ffff00'
    },
    colorError: {
        backgroundColor: '#ff0000'
    },
}))(Badge);

export const DashedPaper = withStyles((theme) => ({
    root: {
        height: "100%",
        border: "6px dashed rgb(123 123 123)",
        color: "rgb(123 123 123)",
        lineHeight: "100%"
    }
}))(Paper);



const ItemList = ({downtime, classes, isPresent}) => (
    <Grid item container justify="flex-start" spacing={1}>
        {
            downtime.downTimeDefinition.items.map(item => (
                <Grid item key={item.name}>
                    <ItemTooltip item={item}
                                 color={isPresent(downtime.relatedItems, item)}
                                 additional={
                                     isPresent(downtime.relatedItems, item) === 'primary' ?
                                         'Tutto ok' : isPresent(downtime.relatedItems, item) === 'secondary' ?
                                         'Presente in inventario ma non assegnato a questa azione' : 'Non hai questo oggetto'
                                 }
                    >
                        <Avatar variant="rounded"
                                className={classes.large}
                                src={showImage(item)}
                        />
                    </ItemTooltip>
                </Grid>
            ))
        }
    </Grid>
)

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));



const Downtime = ({downtimeDefinition, alertOpen}) => {
    const classes = useStyles();
    const {data: downtimes, mutate: mutateDowntimes} = useSWR('/api/downtime/get')
    const {data: inventory} = useSWR('/api/inventory/get')

    const [currentDowntime, setCurrentDowntime] = useState(null);
    const [editableValues, setEditableValues] = useState(null);

    const isPresent = (downtimeRelatedItem, item) => {
        const requireItems = downtimeRelatedItem.map(i => i.item.name);
        const inventoryItems = inventory[0].entries.map(e => e.item.name);

        if (requireItems.includes(item.name) && inventoryItems.includes(item.name)) {
            return "primary";
        } else if (!requireItems.includes(item.name) && inventoryItems.includes(item.name)) {
            return "secondary";
        } else if (!requireItems.includes(item.name) && !inventoryItems.includes(item.name)) {
            return "error";
        }
    }

    return (
        <AppContainer>
            <StepTitle>
                Azioni in narrativa
            </StepTitle>
            <Grid container spacing={3}>
                {
                    downtimes && inventory && downtimes.map((downtime) => (
                        <Grid key={downtime.name} item xs={12} md={4}>
                            <Paper style={{height: "100%"}} component={Box} elevation={4}
                                   p={Theme.typography.pxToRem(50)}>
                                <Grid container direction="column" justify="space-between" alignItems="stretch">
                                    <Grid item>
                                        <Typography variant="subtitle1">{ucfirst(downtime.name)}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography paragraph>{describe(downtime, 150)}</Typography>
                                    </Grid>
                                    <Grid item container justify="flex-start" spacing={1}>
                                        <ItemList downtime={downtime} classes={classes} isPresent={isPresent}/>
                                    </Grid>
                                            <Typography paragraph>&nbsp;</Typography>
                                            <Typography variant="caption">Risoluzione</Typography>
                                            <Typography component={Box}
                                                        paragraph>
                                                {downtime.resolution?.replace(/<[^>]+>/g, '').substring(0, 150) ?? 'Non ancora risolto'}
                                            </Typography>
                                    <Grid>
                                        <CenteredButton variant="contained" color="primary" condensed
                                                        onClick={() => setCurrentDowntime(downtime)}>
                                            vedi
                                        </CenteredButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))
                }
                {
                    !downtimes && !inventory && [1, 2].map(i => (
                        <Grid item xs={12} md={4} key={i}>
                            <Paper style={{height: "100%"}} component={Box} elevation={4}
                                   p={Theme.typography.pxToRem(50)}>
                                <Skeleton variant="rect" width="252px" height="377px" animation="wave"/>
                            </Paper>
                        </Grid>
                    ))
                }
                <Grid item xs={12} md={4}>
                    <DashedPaper component={Box} elevation={0} p={Theme.spacing(1)}>
                        <Box style={{height: "100%"}} display="flex" justifyContent="center" alignItems="center">
                            <HtmlTooltip title="Crea nuova azione in narrativa" placement="top">
                                <Button onClick={() => setEditableValues({})} style={{
                                    fontSize: Theme.typography.pxToRem(100),
                                    color: "rgb(123 123 123)"
                                }}>+</Button>
                            </HtmlTooltip>
                        </Box>
                    </DashedPaper>
                </Grid>
            </Grid>
            {currentDowntime && <ViewDowntime currentDowntime={currentDowntime}
                                              onClose={() => setCurrentDowntime(null)}
                                              onEdit={() => {
                                                  setCurrentDowntime(null)
                                                  setEditableValues(currentDowntime)
                                              }}>
                <ItemList downtime={currentDowntime} classes={classes} isPresent={isPresent}/>
            </ViewDowntime>}
            <CreateDowntime open={editableValues !== null}
                            onClose={() => setEditableValues(null)}
                            onSubmit={() => {
                                mutateDowntimes()
                                    .then(() => setEditableValues(null))
                                    .then(() => alertOpen('Successo', 'Hai creato/modificato la tua azione'))
                            }}
                            downtimeDefinition={downtimeDefinition}
                            inventory={inventory}
                            downtime={editableValues || {}}/>
        </AppContainer>
    );
}

export async function getStaticProps(ctx) {

    const lookupUrl = process.env.BACKEND_URL + 'lookup/';

    const downtimeDefinitionRes = fetch(lookupUrl + 'downtime_definition').then(r => r.json());

    const downtimeDefinition = await downtimeDefinitionRes

    return {
        revalidate: 300,
        props: {downtimeDefinition}
    }
}

export default Downtime;
