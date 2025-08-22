import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/NavBar";
import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import { EdgeStoreProvider } from "../lib/edgestore";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "B-LOGGER",
  description: "Full Stack Blog App",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <EdgeStoreProvider>
      <SessionProvider session={session}>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "antialiased flex flex-col min-h-screen px-0",
              poppins.variable
            )}
          >
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              <main className="flex-grow">{children}</main>
              <footer className="bg-gray-100 text-center py-2 sm:py-3 text-xs sm:text-base dark:bg-gray-950 dark:text-gray-300">
                <p>
                  © {new Date().getFullYear()} Full Stack Blog. All rights
                  reserved.
                </p>
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </EdgeStoreProvider>
  );
}
