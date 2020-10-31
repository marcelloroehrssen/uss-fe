import {Field, Form, Formik} from "formik";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import Theme from "../Theme";
import {TextField} from "formik-material-ui";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

const LoginDialog = ({open, handleClose, login, alertOpen}) => (<>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Formik initialValues={{username: '', password: ''}}
                validate={(values) => {
                    const errors = {};
                    if ('' === values.username) {
                        errors.username = 'Devi compilare lo username'
                    }
                    if ('' === values.password) {
                        errors.password = 'Devi compilare la password'
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => (
                    login(values.username, values.password, () => {
                        handleClose()
                        setSubmitting(false);
                    }, () => {
                        alertOpen('Attenzione', 'Login fallito, username o password errata')
                        setSubmitting(false);
                    })
                )}>
            {({values, submitForm}) => (
                <Form>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Compila i campi per eseguire un login
                        </DialogContentText>
                        <Box mb={Theme.spacing(0.25)}>
                            <Field component={TextField}
                                   value={values.username}
                                   variant="outlined"
                                   name="username"
                                   type="text"
                                   label="Username"
                                   fullWidth/>
                        </Box>
                        <Box>
                            <Field component={TextField}
                                   value={values.password}
                                   variant="outlined"
                                   name="password"
                                   type="password"
                                   label="Password"
                                   fullWidth/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Chiudi
                        </Button>
                        <Button color="primary" onClick={() => submitForm()}>
                            Login
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    </Dialog>
</>)

export default LoginDialog;
