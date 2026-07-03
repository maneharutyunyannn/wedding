import {Inter, Merriweather, Libre_Baskerville, Caveat, Monsieur_La_Doulaise} from "next/font/google";
// import localFont from "next/dist/compiled/@next/font/dist/local";
import localFont from "next/font/local";

export const merriweather = Merriweather({
    subsets: ["latin"],
    variable: "--font-merriweather",
    display: "swap",
});

export const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    variable: "--font-libreBaskerville",
    display: "swap",
});

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

export const monsieurLaDoulaise = Monsieur_La_Doulaise({
    subsets: ['latin'],
    variable: '--font-monsieur',
    display: 'swap',
    weight: "400"
})

export const vrdznagir = localFont({
    src: "./Vrdznagir.otf",
    display: "swap",
    variable: "--font-vrdznagir",
});
export const dzeragir = localFont({
    src: "./SHK_Dzeragir.otf",
    display: "swap",
    variable: "--font-dzeragir",
});