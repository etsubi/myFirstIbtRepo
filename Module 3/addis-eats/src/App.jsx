import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchRef = useRef(null);

  const categories = ["All", "Meals", "Desserts", "Drinks"];

  // Auto focus search field
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Fetch menu whenever category changes
  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/menu.json", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to load Addis Eats menu.");
        }

        const data = await res.json();

        const filtered =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setMenu(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMenu();

    return () => controller.abort();
  }, [category]);

  // Search filter
  const visibleMenu = menu.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Early return: loading
  if (loading) {
    return (
      <div className="status-screen">
        <h2>🍽 Loading Addis Eats...</h2>
      </div>
    );
  }

  // Early return: error
  if (error) {
    return (
      <div className="status-screen">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Addis Eats</h1>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="categories">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {visibleMenu.map((dish) => (
          <div className="card" key={dish.id}>
            <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.category}</p>
            <strong>{dish.price} ETB</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
