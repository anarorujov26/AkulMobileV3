const CustomColors = (colorScheme) => {

    let theme = {
        light: {
            primary: '#1677ff',
            danger: '#e50b2c',
            success: '#50bd7a',
            connectedPrimary: '#1677ff',
            black: 'black',
            grey: "#606060",
            primaryV2: '#1677ff',
            primaryV3: '#1677ff',
            orange: '#ff8f1f',
            greyV1: '#eaecef',
            greyV2: '#bcbcbc',
        },
        dark: {
            primary: '#1677ff',
            danger: '#e50b2c',
            success: '#50bd7a',
            connectedPrimary: '#1677ff',
            black: 'black',
            grey: "#606060",
            primaryV2: '#1677ff',
            primaryV3: '#1677ff',
            orange: '#ff8f1f',
            greyV1: '#eaecef',
            greyV2: '#bcbcbc',
        }
    }

    return theme[colorScheme] || theme.light;
}

export default CustomColors;