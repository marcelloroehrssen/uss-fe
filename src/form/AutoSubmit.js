import {useFormikContext} from "formik";
import {useEffect} from "react";

const AutoSubmit = () => {

    const {isValid, submitForm, dirty} = useFormikContext();

    useEffect(() => {
        if (isValid && dirty) {
             submitForm();
        }
    }, [isValid]);

    return null;
};

export default AutoSubmit;
