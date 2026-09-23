import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addis Eats",
  description: "Order delicious Ethiopian food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
