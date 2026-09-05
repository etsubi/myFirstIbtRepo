import { useState } from "react";

function Dish({ name, price, spicy, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((previousCount) => previousCount + 1);
    onAdd(price);
  };

  return (
    <div className="dish">
      <div>
        <h3>{name}</h3>

        <p>{price} ETB</p>

        {spicy && <span className="spicy">🌶️ Spicy</span>}
      </div>

      <div className="dish-actions">
        <span className="counter">Added: {count}</span>

        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Dish;
