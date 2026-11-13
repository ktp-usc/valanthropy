import type { Metadata } from "next";
import { Noto_Serif, Open_Sans } from "next/font/google";
import Footer from "@/components/footer";
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap",
    variable: "--font-open-sans",
});

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-noto-serif",
});

export const metadata: Metadata = {
    title: "VAlanthropy",
    description: "Turning compassion into lasting change.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${openSans.variable} ${notoSerif.variable}`}
        >
            <body className="font-sans antialiased">
                {children}
                <Footer />
            </body>
        </html>
    );
}