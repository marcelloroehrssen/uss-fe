import {createMuiTheme} from '@material-ui/core/styles'

const Theme = createMuiTheme(
    {
        spacing: 8,
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    body: {
                        backgroundImage: "url(/images/wood_bg.jpg)",
                        paddingTop: '74px'
                    }
                }
            },
            MuiPaper: {
                root: {
                    backgroundImage: "url(/images/paper-texture.jpg)",
                    fontFamily: 'victorian'
                }
            },
            MuiTypography: {
                h5: {
                    fontFamily: 'victorian',
                    fontSize: '20px'
                },
                body1: {
                    fontFamily: 'Times New Roman',
                },
                body2: {
                    fontFamily: 'victorian'
                },
                subtitle1: {
                    fontFamily: 'victorian',
                    fontSize: '40px',
                },
                subtitle2: {
                    fontFamily: 'Times New Roman',
                    fontSize: '16px',
                },
                caption: {
                    fontFamily: 'Times New Roman',
                    fontSize: '20px'
                }
            },
            MuiCheckbox: {
                root: {
                    "&$checked": {
                        color: '#d32f2f'
                    }
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
            common: {
                black: 'rgba(0, 0, 0, 1)',
                white: '#fff'
            },
            primary: {
                light: 'rgba(227, 227, 227, 1)',
                main: 'rgba(51, 51, 51, 1)',
                dark: 'rgba(51, 51, 51, 1)',
                contrastText: 'rgba(227, 227, 227, 1)'
            },
            // secondary: {
            //     light: 'rgba(252, 252, 252, 1)',
            //     main: 'rgba(204, 204, 204, 1)',
            //     dark: 'rgba(112, 112, 112, 1)',
            //     contrastText: 'rgba(255, 255, 255, 1)'
            // },
            error: {
                light: '#e57373',
                main: 'rgba(154, 0, 0, 1)',
                dark: '#d32f2f',
                contrastText: '#fff'
            },
            // text: {
            //     primary: 'rgba(51, 51, 51, 1)',
            //     secondary: 'rgba(204, 204, 204, 1)',
            //     disabled: 'rgba(112, 112, 112, 1)',
            //     hint: 'rgba(162, 116, 116, 0.38)'
            // }
        }
    }
)

export default Theme;
