import { Link, NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">🍽 Addis Eats</Link>
        </div>

        <nav className="nav">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/menu">Menu</NavLink>

          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
