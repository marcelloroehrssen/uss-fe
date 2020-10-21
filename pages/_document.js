import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import Theme from '../src/Theme';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content={Theme.palette.primary.main} />
                    <link rel="stylesheet" href="/fonts/fonts.css" />
                    <link rel="stylesheet" href='/css/style.css' />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {

    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
