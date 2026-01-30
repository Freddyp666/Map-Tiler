// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui")
    ],
    // Opcional: Si quieres una lista de temas específicos
    daisyui: {
        themes: ["halloween"],
    },
}