import type { Metadata, Viewport } from "next";
import { invitation } from "@/lib/invitation";
import "./globals.css";

export const metadata: Metadata = {
  title: invitation.pageTitle,
  description: `You are invited to ${invitation.childName}'s birthday celebration.`
};

export const viewport: Viewport = {
  themeColor: "#fff7e8"
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
