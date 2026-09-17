import { useState } from "react";
import useCartStore from "../store/cartStore";

function Dish({ id, name, price, spicy, image }) {
  const [count, setCount] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    const dish = {
      id,
      name,
      price,
      spicy,
      image,
    };

    addItem(dish);

    setCount((previousCount) => previousCount + 1);
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

        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Dish;
