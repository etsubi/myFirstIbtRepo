import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  return (
    <section>
      <h1>My Orders</h1>
      <p>Welcome, {session.email}!</p>
      <p>Your orders will appear here.</p>
    </section>
  );
}
