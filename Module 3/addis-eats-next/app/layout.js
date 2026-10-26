
import Link from "next/link";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats - Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },
  description:
    "Discover Ethiopian dishes and order food for delivery across Addis Ababa.",
  applicationName: "Addis Eats",
  openGraph: {
    siteName: "Addis Eats",
    title: "Addis Eats - Ethiopian Food Delivery",
    description:
      "Discover Ethiopian dishes and order food for delivery across Addis Ababa.",
    url: "/",
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats - Ethiopian Food Delivery",
    description:
      "Discover Ethiopian dishes and order food for delivery across Addis Ababa.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Addis Eats</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}
