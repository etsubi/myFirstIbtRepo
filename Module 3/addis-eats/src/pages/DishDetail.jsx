import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDish() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
        );

        if (!response.ok) {
          throw new Error("Failed to load dish.");
        }

        const data = await response.json();

        const foundDish = data.meals?.find((meal) => meal.idMeal === id);

        if (!foundDish) {
          setDish(null);
          setError("Dish not found.");
          return;
        }

        setDish(foundDish);
      } catch (error) {
        console.error("Error loading dish:", error);
        setError("Something went wrong while loading the dish.");
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [id]);

  if (loading) {
    return (
      <section className="dish-detail">
        <p>Loading dish...</p>
      </section>
    );
  }

  if (error || !dish) {
    return (
      <section className="dish-detail">
        <h1>Dish Not Found</h1>

        <p>{error || "We couldn't find this dish."}</p>

        <Link to="/menu">← Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
      <Link to="/menu">← Back to Menu</Link>

      <div className="dish-detail-content">
        <img
          src={dish.strMealThumb}
          alt={dish.strMeal}
          className="dish-detail-image"
        />

        <div className="dish-detail-info">
          <p className="dish-category">{dish.strCategory || "Beef"}</p>

          <h1>{dish.strMeal}</h1>

          <p>Enjoy this delicious dish from Addis Eats.</p>

          <button type="button">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

export default DishDetail;
