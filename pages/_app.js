import React, {useEffect} from "react";
import Theme from "../src/Theme";
import {ThemeProvider} from "@material-ui/styles";
import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";

const MyApp = ({Component, pageProps}) => {

    const router = useRouter();

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Head>
                    <title>Ciao 2</title>
                </Head>
                <div className="main-bg">
                    <Container>
                        <Component {...pageProps} key={router.route}/>
                    </Container>
                </div>
            </ThemeProvider>
        </>
    )

}

export default MyApp;
