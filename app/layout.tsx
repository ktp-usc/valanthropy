import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Footer from "../components/footer";

export const metadata: Metadata = {
    title: "VAlanthropy",
    description: "Turning compassion into lasting change."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        { children }
        <Footer />
        </body>
        </html>
    );
}