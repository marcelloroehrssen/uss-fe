import IntroductionTextCtx from "./context/IntroductionTextProvider";
import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const IntroductionText = ({hook}) => {

    const introductionText = useContext(IntroductionTextCtx);

    return <Typography variant={'subtitle2'}
                       component={Box}
                       paragraph={true}
                       dangerouslySetInnerHTML={{__html: introductionText.find(i => i.hook === hook).content}} />;
}

export default IntroductionText;
