/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                richblue: {
                    5: "#ECF5FF",
                    25: "#C6D6E1",
                    50: "#A0B7C3",
                    100: "#7A98A6",
                    200: "#537988",
                    300: "#2D5A6A",
                    400: "#073B4C",
                    500: "#063544",
                    600: "#042E3B",
                    700: "#032833",
                    800: "#01212A",
                    900: "#001B22",
                },
                richblack: {
                    5: "#F1F2FF",
                    25: "#DBDDEA",
                    50: "#C5C7D4",
                    100: "#AFB2BF",
                    200: "#999DAA",
                    300: "#838894",
                    400: "#6E727F",
                    500: "#585D69",
                    600: "#424854",
                    700: "#2C333F",
                    800: "#161D29",
                    900: "#000814",
                },
            },
            backgroundImage: {
                'theme-gradient': 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)',
            },
            fontFamily: {
                mono: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}