import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";

const FormikRadioGroup = ({field, form: {touched, errors, values}, name, options, children, ...props}) => {
    const fieldName = name || field.name;

    return (<>
        <RadioGroup {...field} {...props} name={fieldName}>{children}</RadioGroup>
        {touched[fieldName] && errors[fieldName] && (
            <span style={{color: "red", fontFamily: "sans-serif"}}>
          {errors[fieldName]}
        </span>
        )}
    </>);
};

export default FormikRadioGroup;
