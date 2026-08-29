import { useState } from "react";
import Menu from "./Menu";
import DeliveryForm from "./DeliveryForm";

function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Traditional Ethiopian Favorites</p>
    </header>
  );
}

function App() {
  const [total, setTotal] = useState(0);

  return (
    <div className="app">
      <Header />

      <Menu onTotalChange={setTotal} />

      <div className="total-banner">
        <span>Current Order Total</span>
        <strong>{total.toLocaleString()} ETB</strong>
      </div>

      <DeliveryForm total={total} />
    </div>
  );
}

export default App;
