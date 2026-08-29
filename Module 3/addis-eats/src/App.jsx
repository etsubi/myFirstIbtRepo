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
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 },
  { id: 4, name: "Kitfo", price: 320 },
  { id: 5, name: "Firfir", price: 150 },
  { id: 6, name: "Injera Combo", price: 350 },
];

function App() {
  return (
    <div className="app">
      <Header />

      <section>
        <h2>Today's Menu</h2>

        {menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </section>
    </div>
  );
}

export default App;
