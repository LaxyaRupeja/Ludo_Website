import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { TRPCProvider } from "@/trpc/client";
import {
  ClerkProvider
} from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              forcedTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
                <div className="h-full rounded-md">
                  <Navbar />
                  <div className="p-3">
                    {
                      children
                    }
                  </div>

                </div>
              </main>
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html >
    </ClerkProvider>
  );
}
