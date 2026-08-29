import { useState } from "react";
import Dish from "./Dish";

function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Traditional Ethiopian Favorites</p>
    </header>
  );
}

const menu = [
  { id: 1, name: "Doro Wat", price: 240, category: "Stew", spicy: true },
  { id: 2, name: "Shiro", price: 120, category: "Stew", spicy: false },
  { id: 3, name: "Tibs", price: 280, category: "Meat", spicy: true },
  { id: 4, name: "Kitfo", price: 320, category: "Meat", spicy: false },
  { id: 5, name: "Firfir", price: 150, category: "Breakfast", spicy: true },
  {
    id: 6,
    name: "Injera Combo",
    price: 350,
    category: "Special",
    spicy: false,
  },
];

function App() {
  const [category, setCategory] = useState("All");

  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  return (
    <div className="app">
      <Header />

      <div className="filters">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Stew")}>Stew</button>
        <button onClick={() => setCategory("Meat")}>Meat</button>
        <button onClick={() => setCategory("Breakfast")}>Breakfast</button>
        <button onClick={() => setCategory("Special")}>Special</button>
      </div>

      <section>
        <h2>Today's Menu</h2>

        {filteredMenu.length === 0 ? (
          <p className="empty">No dishes found.</p>
        ) : (
          filteredMenu.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default App;
