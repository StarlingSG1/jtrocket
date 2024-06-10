import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {MobileHeader} from "@/app/components/organisms/Sidebar/MobileHeader";
import {MobileSidebar} from "@/app/components/organisms/Sidebar/MobileSidebar";
import {StaticDesktopSidebar} from "@/app/components/organisms/Sidebar/StaticDesktopSidebar";
import {HomeIcon} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import ToastProvider from "@/utils/ToastProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        template: "%s | JT Rocket",
        default: "JT Rocket",
    },
    description: "La bibliothèque de JT Rocket",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    // const MobileHeader = dynamic(() => import("@/app/components/organisms/Sidebar/MobileHeader"));
    // const MobileSidebar = dynamic(() => import("@/app/components/organisms/Sidebar/MobileSidebar"));
    // const StaticDesktopSidebar = dynamic(() => import("@/app/components/organisms/Sidebar/StaticDesktopSidebar"));
    return (
        <html lang="en" className={"h-full bg-gray-50"}>
        <body className={inter.className + "h-full"}>
        <MobileHeader/>
        <MobileSidebar/>
        <StaticDesktopSidebar/>
        <main className="lg:pl-72 min-h-screen">
            <ToastProvider>
                {children}
            </ToastProvider>
        </main>
        </body>
        </html>
    );
}
