import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Name",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen w-screen antialiased flex flex-col gap-7 bg-gradient-background bg-no-repeat bg-cover",
          inter.className
        )}
      >
        <Providers>
          <Navbar />
          <main className="gap-4 lg:gap-7 flex flex-col items-center justify-center text-center h-full overflow-y-auto mx-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
