import Dish from "./Dish";
import ErrorBoundary from "./ErrorBoundary";

function DishList({ dishes, selectedCategory, onView }) {
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (filteredDishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div className="dish-list">
      {filteredDishes.map((dish) => (
        <ErrorBoundary key={dish.id}>
          <Dish
            id={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            image={dish.image}
            onView={onView}
          />
        </ErrorBoundary>
      ))}
    </div>
  );
}

export default DishList;
