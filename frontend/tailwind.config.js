/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#801A86",
        primary: "#866ec7",
        bluishgray: "#3C4F76",
        lavendar: "#DDDBF1",
        charcoal: "#383F51",
        old_primary: "rgb(156, 28, 212)",
        book: "#fbfbf1",
        russianviolet: "#4E0250",
        mardigras: "#801A86",
        ultraviolet: "#645986",
        tearose: "#FAC8CD",
        thistle: "#D7BCC8",
        location: "rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
}

