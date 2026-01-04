import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElevateAI - AI Literacy for Everyone",
  description:
    "Learn to recognize AI content, use AI safely, and understand AI in the real world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
