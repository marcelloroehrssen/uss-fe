import {createMuiTheme} from '@material-ui/core/styles'

const Theme = createMuiTheme(
    {
        spacing: 8,
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    body: {
                        backgroundImage: "url(https://www.ppt-backgrounds.net/thumbs/rustic-wood-texture-seamless-clip-art-slides-backgrounds.jpg)",
                    }
                }
            },
            MuiPaper: {
                root: {
                    backgroundImage: "url(https://naldzgraphics.net/wp-content/uploads/2014/07/1-certificate-paper-texture.jpg)",
                    fontFamily: 'victorian'
                }
            },
            MuiTypography: {
                body1: {
                    fontFamily: 'Times New Roman'
                },
                body2: {
                    fontFamily: 'victorian'
                },
                subtitle1: {
                    fontFamily: 'victorian',
                    fontSize: '40px'
                },
                caption: {
                    fontFamily: 'Times New Roman',
                    fontSize: '20px'
                }
            }
        },
        Typography: {
            fontFamily: [
                'Times New Roman',
                'victorian',
                'Arial',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        palette: {
        //     common: {
        //         black: 'rgba(0, 0, 0, 1)',
        //         white: '#fff'
        //     },
        //     background: {
                // paper: 'rgba(0, 0, 0, 1)',
                // default: 'rgba(0, 0, 0, 1)'
            // }
        //     primary: {
        //         light: 'rgba(227, 227, 227, 1)',
        //         main: 'rgba(51, 51, 51, 1)',
        //         dark: 'rgba(51, 51, 51, 1)',
        //         contrastText: 'rgba(227, 227, 227, 1)'
        //     },
        //     secondary: {
        //         light: 'rgba(252, 252, 252, 1)',
        //         main: 'rgba(204, 204, 204, 1)',
        //         dark: 'rgba(112, 112, 112, 1)',
        //         contrastText: 'rgba(255, 255, 255, 1)'
        //     },
        //     error: {
        //         light: '#e57373',
        //         main: 'rgba(154, 0, 0, 1)',
        //         dark: '#d32f2f',
        //         contrastText: '#fff'
        //     },
        //     text: {
        //         primary: 'rgba(243, 243, 243, 0.87)',
        //         secondary: 'rgba(255, 255, 255, 0.54)',
        //         disabled: 'rgba(70, 0, 0, 0.38)',
        //         hint: 'rgba(162, 116, 116, 0.38)'
        //     }
        }
    }
)

export default Theme;
