import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";

export const metadata: Metadata = {
  title: "Vita - Healthcare Platform",
  description: "Connect with doctors for appointments and home visits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalNavbar />
        <section>

        {children}
        </section>
      </body>
    </html>
  );
}
