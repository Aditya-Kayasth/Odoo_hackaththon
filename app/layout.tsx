import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/NavBar";
import Container from "@/components/layout/Container";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Full Stack Blog Next.js App",
  description: "For a hackathon project",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased flex flex-col min-h-screen px-2",
          poppins.variable
        )}
      >
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-100 text-center py-4 dark:bg-gray-900 dark:text-gray-300">
            <p>
              © {new Date().getFullYear()} Full Stack Blog. All rights reserved.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
