import {useFormikContext} from "formik";
import {useEffect} from "react";

const AutoSubmit = () => {

    const {values, isValidating, validateForm, dirty, isValid, submitForm, initialValues, ...props} = useFormikContext();

    useEffect(() => {
        if (isValid && dirty && values !== initialValues) {
            submitForm();
        }
    }, [isValid, dirty, values]);

    return null;
};

export default AutoSubmit;
