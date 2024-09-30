import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
  title: "Quilox - Play Ludo, Win Real Money!",
  description: "Join LudoCash to play exciting Ludo games and win cash prizes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider appearance={
      {
        baseTheme: dark
      }
    }>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
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
        </body>
      </html >
    </ClerkProvider>
  );
}
