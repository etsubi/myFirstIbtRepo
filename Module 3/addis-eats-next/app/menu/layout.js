import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <section>
      <header>
        <h2>Our Menu</h2>

        <nav>
          <Link href="/menu">All Dishes</Link>
        </nav>
      </header>

      {children}
    </section>
  );
}
