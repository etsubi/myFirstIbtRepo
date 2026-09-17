import useCartStore from "../store/cartStore";

function Dish({ id, name, price, spicy, image }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const count = items.filter((item) => item.id === id).length;

  function handleAdd() {
    const dish = {
      id,
      name,
      price,
      spicy,
      image,
    };

    addItem(dish);
  }

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
