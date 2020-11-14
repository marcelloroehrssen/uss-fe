import StepTitle from "../../layout/StepTitle";
import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Rating from "@material-ui/lab/Rating";
import AppTooltip from "../../tooltip/AppTooltip";
import CenteredButton from "../../form/CenteredButton";
import Theme from "../../Theme";
import IntroductionText from "../../IntroductionText";
import {useLookup} from "../../hook/UseLookup";

const BackgroundChoose = ({selectedbackgrounds, onValueChange, characterSheet}) => {

    const [availableJobs, availableFaiths, availableBackgrounds, availableDefects] = useLookup(['availableJobs', 'availableFaiths', 'availableBackgrounds', 'availableDefects']);
    const [backgroundAdded, setBackgroundAdded] = useState({});

    const maxBgAcquireReached = (bg) => {
        if (bg.name === 'Marito/Moglie') {
            const limitWife = availableFaiths.find(f => f.name === characterSheet.faith).limitWife;
            if (limitWife === 0) {
                return false;
            }
            return (backgroundAdded[bg.name] ?? 1) >= limitWife;
        } else if (bg.count !== 0) {
            return (backgroundAdded[bg.name] ?? 1) >= bg.count;
        }
        return false;
    }

    const acquireMore = (bg) => () => {
        if (!maxBgAcquireReached(bg)) {
            backgroundAdded[bg.name] = backgroundAdded[bg.name] === undefined ? 2 : backgroundAdded[bg.name] + 1;
            setBackgroundAdded({...backgroundAdded})
        }
    }

    const getMaxAcquirableBackground = (bg) => {
        return Array.from(Array(backgroundAdded[bg.name] ?? 1).keys())
    }

    const getBackgroundCost = (bg, acquiredTimes) => {
        switch (bg.costType) {
            case 0:
                return acquiredTimes;
            case 1:
                return acquiredTimes === 1 ? 1 : acquiredTimes === 2 ? 4 : 9;
            case 2:
                return acquiredTimes * 2;
            case 3:
                return acquiredTimes * 3;
        }
    }

    const getSpentPoints = () => Object.keys(selectedbackgrounds).reduce((tot, item) => {
        return tot + getBackgroundCost(
            availableBackgrounds.find(b => b.name === item.replace(/_[0-9]+$/,'')), selectedbackgrounds[item]
        );
    }, 0)

    const getAvailablePoints = () => {
        const defectsPoints = availableDefects.filter(d => characterSheet.defects.includes(d.name)).reduce((t, d) => t + d.cost, 0)
        return defectsPoints + ((2 * characterSheet.attributes.mental) + 1);
    }

    const getRemainingPoints = () => getAvailablePoints() - getSpentPoints();

    const getMaxAttribute = () => 3

    const backgroundFilter = (bg) => {
        if (bg.name === 'Marito/Moglie') {
            return availableJobs.find(j => j.name === characterSheet.job).canHaveWife;
        }
        return true;
    }

    return <>
        <StepTitle>Background</StepTitle>
        <IntroductionText hook="background" />
        <Grid container
              direction="column"
              justify="center"
              alignItems="stretch">
            <Grid item>
                <Typography>Per ora hai <strong>{getRemainingPoints()}</strong> punti da spendere
                    su <strong>{getAvailablePoints()}</strong></Typography>
            </Grid>
            {
                availableBackgrounds.filter(backgroundFilter).map(bg => <React.Fragment key={bg.name}>
                    <Grid item>
                        <Typography component={Box} variant={"subtitle1"}>{bg.name}</Typography>
                        <Typography component={Box} variant={"caption"}
                                    dangerouslySetInnerHTML={{__html: bg.description}}/>
                        {bg.bonus &&
                        <Typography component={Box} variant={"caption"}><strong>Bonus:</strong> {bg.bonus}</Typography>}
                        {bg.malus &&
                        <Typography component={Box} variant={"caption"}><strong>Malus:</strong> {bg.malus}</Typography>}
                        {bg.extra &&
                        <Typography component={Box} variant={"caption"}
                                    dangerouslySetInnerHTML={{__html: '<strong>Extra:</strong>' + bg.extra}}/>}
                        {bg.count > 0 && <Typography component={Box} variant={"caption"}>
                            <strong>Acquistabile:</strong> massimo {bg.count} volte
                        </Typography>}
                        {
                            getMaxAcquirableBackground(bg).map(i => (
                                <React.Fragment key={bg.name + '_' + i}>
                                    <Typography component={Box} variant={"caption"} align={"center"}
                                                paragraph={true}><strong>Pallini:</strong>
                                        <AppTooltip availableData={availableBackgrounds} data={bg.name}
                                                    placement={"right"}>
                                            <Rating
                                                name={bg.name + '_' + i}
                                                value={selectedbackgrounds[bg.name + '_' + i] ?? 0}
                                                max={getMaxAttribute()}
                                                onChange={(e, v) => {
                                                    if (v === null) {
                                                        delete selectedbackgrounds[bg.name + '_' + i];
                                                        onValueChange({...selectedbackgrounds})
                                                    } else if (v !== 0) {
                                                        if (v < selectedbackgrounds[bg.name + '_' + i]) {
                                                            onValueChange({...selectedbackgrounds, [bg.name + '_' + i]: v})
                                                        } else if (getRemainingPoints() >= getBackgroundCost(bg, v)) {
                                                            onValueChange({...selectedbackgrounds, [bg.name + '_' + i]: v})
                                                        }
                                                    }
                                                }}
                                                icon={<Brightness1Icon/>}
                                            />
                                        </AppTooltip>
                                    </Typography>
                                </React.Fragment>
                            ))
                        }
                        {bg.keep &&
                        <Typography component={Box} variant={"caption"}><strong>Mantenimento:</strong> {bg.keep}
                        </Typography>}
                        {bg.notes &&
                        <Typography component={Box} variant={"caption"}><strong>Note:</strong> {bg.notes}</Typography>}
                    </Grid>
                    {!maxBgAcquireReached(bg) && <Grid item>
                            <CenteredButton
                                style={{width:'300px', fontSize:Theme.typography.pxToRem(16)}}
                                variant="contained"
                                onClick={acquireMore(bg)}
                                color="primary">
                                Acquista ancora
                            </CenteredButton>
                    </Grid>}
                </React.Fragment>)
            }
        </Grid>
    </>
}

export default BackgroundChoose;
