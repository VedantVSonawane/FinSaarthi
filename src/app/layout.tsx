import type { Metadata } from "next";
import { Poppins, Outfit, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-primary",
    display: "swap"
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap"
});

const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari", "latin"],
    variable: "--font-hindi",
    display: "swap"
});

export const metadata: Metadata = {
    title: "FinSaarthi - आपका वित्तीय सारथी | Your AI Financial Companion",
    description: "India's trusted AI-powered financial companion. Get personalized financial guidance, discover government schemes, and master your money - all in your language.",
    keywords: ["financial literacy", "government schemes", "budget tracking", "financial planning", "India", "Hindi", "AI assistant"],
    authors: [{ name: "FinSaarthi Team" }],
    openGraph: {
        title: "FinSaarthi - Your AI Financial Companion for India",
        description: "Democratizing financial literacy and government scheme access for 500 million Indians",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable} ${outfit.variable} ${notoSansDevanagari.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
