import Dish from "./Dish";

function DishList({ dishes, selectedCategory }) {
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (filteredDishes.length === 0) {
    return <p className="empty">No dishes found.</p>;
  }

  return (
    <div className="dish-list">
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          image={dish.image}
        />
      ))}
    </div>
  );
}

export default DishList;
