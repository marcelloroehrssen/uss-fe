import StepTitle from "../../layout/StepTitle";
import React from "react";
import {Typography} from "@material-ui/core";
import {ucfirst} from "../../StringUtils";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import {showImage} from "../../downtime/ShowImage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from "@material-ui/core/Tooltip";
import ShowDot from "../../layout/ShowDot";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


const ItemChoose = ({characterSheet, itemsType, items, onValueChange}) => {

    const classes = useStyles();

    const getSpentPoints = () => {
        return Object.keys(characterSheet.items).reduce((tot, i) => {
            return tot + items.find(item => item.id === (i*1)).value
        }, 0)
    }

    const getObjectPoints = () => {
        const points = [5, 9, 13];
        return Object.keys(characterSheet.backgrounds).map(k => {
            if (k.replace(/_[0-9]+$/, '') === 'Oggetti e Risorse') {
                return points[characterSheet.backgrounds[k] - 1];
            }
            return 0;
        }).reduce((tot, v) => tot + v, 0)
    }

    const addItem = (item) => () => {
        if ((getObjectPoints() -getSpentPoints()) > item.value) {
            if (item.max > (characterSheet.items[item.id] ?? 0)) {
                characterSheet.items[item.id] = (characterSheet.items[item.id] ?? 0) + 1;
                onValueChange({...characterSheet.items});
            }
        }
    }

    const removeItem = (item) => () => {
        characterSheet.items[item.id] = (characterSheet.items[item.id] ?? 0) - 1;
        if (characterSheet.items[item.id] <= 0) {
            delete characterSheet.items[item.id];
        }
        onValueChange({...characterSheet.items});
    }

    return (<>
        <StepTitle>Oggetti</StepTitle>
        <Typography paragraph align={"center"}>
            Hai speso <strong>{getSpentPoints()}</strong> punti abilità su <strong>{getObjectPoints()}</strong>
        </Typography>
        {
            itemsType.map(type => (<React.Fragment key={type}>
                <Typography paragraph variant={"subtitle1"}>{ucfirst(type)}</Typography>
                <Grid container spacing={3}>
                    {
                        items.filter(item => item.type === type).map(item => (
                            <Grid item xs={12} md={4} key={item.id}>
                                <Card>
                                    <CardHeader disableTypography title={<Typography>{item.name}</Typography>}/>
                                    <CardMedia className={classes.media} image={showImage(item)} title={item.name}/>
                                    <CardContent>
                                        <Typography align="center">
                                            <ShowDot name="dots" max={3} value={item.dots}/>
                                        </Typography>
                                        <Typography variant={"body1"}
                                                    dangerouslySetInnerHTML={{__html: item.description}}/>
                                        <Typography variant={"body1"}><strong>Punti oggetto</strong>: {item.value}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Tooltip title="Rimuovi" placement="top" arrow>
                                            <IconButton onClick={removeItem(item)}>
                                                <RemoveIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Typography variant={"body1"}>{characterSheet.items[item.id] ?? 0}</Typography>
                                        <Tooltip title="Aggiungi" placement="top" arrow>
                                            <IconButton onClick={addItem(item)}>
                                                <AddIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </Grid>

                        ))
                    }
                </Grid>
            </React.Fragment>))
        }
    </>)
}

export default ItemChoose;
