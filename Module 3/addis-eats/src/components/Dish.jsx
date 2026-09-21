import { memo, useRef } from "react";
import useCartStore from "../store/cartStore";

function Dish({ id, name, price, spicy, image, onView }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const triggerRef = useRef(null);

  const count = items.filter((item) => item.id === id).length;

  function handleAdd() {
    addItem({
      id,
      name,
      price,
      spicy,
      image,
    });
  }

  return (
    <div className="dish">
      <div>
        <h3>{name}</h3>

        <p>{price} ETB</p>

        {spicy && <span>🌶️ Spicy</span>}
      </div>

      <div className="dish-actions">
        <span>Added: {count}</span>

        <button onClick={handleAdd}>Add</button>

        <button
          ref={triggerRef}
          onClick={() => onView({ id, name, price, image }, triggerRef)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default memo(Dish);
