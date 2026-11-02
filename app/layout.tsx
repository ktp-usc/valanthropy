import type { Metadata } from "next";
import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}