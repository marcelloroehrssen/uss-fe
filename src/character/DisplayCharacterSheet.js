import {Grid, Typography} from "@material-ui/core";
import ShowDot from "../layout/ShowDot";
import React from "react";
import {ucfirst} from "../StringUtils";

const DisplayCharacterSheet = ({currentCharacterSheet}) => (
    <Grid container direction="row">
        <Grid item xs={12}>
            <Typography paragraph={true}>
                {currentCharacterSheet.faith} - {currentCharacterSheet.faction} - {currentCharacterSheet.job}
            </Typography>
            <Typography paragraph={true}>
                <strong>Modalità</strong>: {currentCharacterSheet.mode === 1 ? 'Softcore' : 'Hardcore'}
            </Typography>
        </Grid>
        <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
                <Typography><strong>Attributi</strong></Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    forza:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    <ShowDot name="physical"
                             value={currentCharacterSheet.attributes.physical}/>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    mentali:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    <ShowDot name="mental"
                             value={currentCharacterSheet.attributes.mental}/>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography paragraph={true}>
                    sociali:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    <ShowDot name="social"
                             value={currentCharacterSheet.attributes.social}/>
                </Typography>
            </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
                <Typography><strong>Difetti</strong> {currentCharacterSheet.defectMode === 1 ? 'casuale' : 'non casuale'}
                </Typography>
                {
                    currentCharacterSheet.defects.map((d, i) => (
                        <Typography key={d}>
                            {d.toLowerCase()}
                        </Typography>)
                    )
                }
            </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
                <Typography><strong>Abilità</strong></Typography>
            </Grid>
            {
                Object.keys(currentCharacterSheet.skills).map((js, i) => (
                    <React.Fragment key={i}>
                        <Grid item xs={6}>
                            <Typography>{ucfirst(js)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <ShowDot name={"skills_" + {i}}
                                     value={currentCharacterSheet.skills[js]}/>
                        </Grid>
                    </React.Fragment>)
                )
            }
        </Grid>
        <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
                <Typography><strong>Background</strong></Typography>
            </Grid>
            {
                Object.keys(currentCharacterSheet.backgrounds).map((bg, i) => (
                    <React.Fragment key={bg}>
                        <Grid item xs={6}>
                            <Typography>
                                {ucfirst(bg.replace(/_[0-9]+$/, ''))}:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <ShowDot name={bg} value={currentCharacterSheet.backgrounds[bg]} max={3}/>
                        </Grid>
                    </React.Fragment>
                ))
            }
        </Grid>
    </Grid>
)

export default DisplayCharacterSheet;
