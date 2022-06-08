module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
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
                'c_text_5': '#FFFFFF',
                'c_text_6': '#3A3731',
                'c_border': '#494949',
                'c_bg_1': '#111111',
                'c_bg_2': '#383838',

            },
            spacing: {
                '2%': '2%',
                '3%': '3%',
                '10%': '10%',
                '15%': '15%',
                '20%': '20%',
                '23%': '23%',
                '24%': '24%',
                '27%': '27%',
                '30%': '30%',
                '70%': '70%',
                '74%': '74%',
                '75%': '75%',
                '77%': '77%'
            },
        }
    }
}