import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            {children}
        </div>
    );
}
