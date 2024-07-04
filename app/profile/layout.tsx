import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";


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
        <div className="flex gap-10">
            <div className="flex-1">
                {children}
            </div>
            <div className="lg:block hidden">
                <Sidebar />
            </div>
        </div>
    );
}
