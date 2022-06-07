module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extends: {
            colors: {
                'c_primary_yellow': '#FEA013',
                'c_primary_brown': '#BA4A0C',
                'c_primary_red': '#D23131',
                'c_neutral_1': '#222222',
                'c_neutral_2': '#2D2D2D',
                'c_text_1': '#F8F8F8',
                'c_text_2': '#CBCBCB',
                'c_text_3': '#999999',
                'c_text_4': '#707070',
                'c_border': '#494949',
                'c_bg_1': '#111111',
                'c_bg_2': '#383838'
            }
        }
    }
}