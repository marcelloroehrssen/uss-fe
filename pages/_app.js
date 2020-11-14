import React, {useEffect, useState} from "react";
import Theme from "../src/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../src/layout/Header";
import {useAlert} from "../src/hook/UseAlert";
import LoginDialog from "../src/layout/LoginDialog";
import RegisterDialog from "../src/layout/RegisterDialog";
import {useRegister} from "../src/hook/UseRegister";
import {useUser} from "../src/hook/UseUser";
import MustLogin from "../src/layout/MustLogin";

const MyApp = ({Component, pageProps}) => {

    const router = useRouter();
    const {alertOpen, AlertNode} = useAlert();

    const {data, login, logout} = useUser();
    const {register, validateEmail} = useRegister();
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={Theme}>
                <CssBaseline/>
                <Head>
                    <title>Una Sporca Storia</title>
                </Head>
                <div className="main-bg">
                    <Header data={data}
                            logout={logout}
                            setOpenLoginDialog={setOpenLoginDialog}
                            setOpenRegisterDialog={setOpenRegisterDialog}/>
                    <Container>
                        {data && <Component {...pageProps}
                                            alertOpen={alertOpen}
                                            key={router.route}/>}
                        {!data && <MustLogin />}
                    </Container>
                </div>
                <LoginDialog open={openLoginDialog} alertOpen={alertOpen} handleClose={() => setOpenLoginDialog(false)}
                             login={login}/>
                <RegisterDialog open={openRegisterDialog} alertOpen={alertOpen}
                                handleClose={() => setOpenRegisterDialog(false)} validateEmail={validateEmail}
                                register={register}/>
                {AlertNode}
            </ThemeProvider>
        </>
    )
}

export default MyApp;
