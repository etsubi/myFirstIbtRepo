import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";

import CategoryBar from "../components/CategoryBar";
import DishList from "../components/DishList";
import DishModal from "../components/DishModal";

const menu = [
  {
    id: 1,
    name: "Doro Wat",
    category: "Meals",
    price: 350,
    image: "/images/doro.jpg",
  },
  {
    id: 2,
    name: "Kitfo",
    category: "Meals",
    price: 420,
    image: "/images/kitfo.jpg",
  },
  {
    id: 3,
    name: "Tibs",
    category: "Meals",
    price: 390,
    image: "/images/tibs.jpg",
  },
  {
    id: 4,
    name: "Cheesecake",
    category: "Desserts",
    price: 180,
    image: "/images/cake.jpg",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 160,
    image: "/images/choco.jpg",
  },
  {
    id: 6,
    name: "Mango Juice",
    category: "Drinks",
    price: 120,
    image: "/images/mango.jpg",
  },
  {
    id: 7,
    name: "Coffee",
    category: "Drinks",
    price: 80,
    image: "/images/coffee.jpg",
  },
];

const categories = ["All", "Meals", "Desserts", "Drinks"];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  const [selectedDish, setSelectedDish] = useState(null);

  const triggerRef = useRef(null);

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  function handleView(dish, ref) {
    triggerRef.current = ref.current;
    setSelectedDish(dish);
  }

  return (
    <section className="menu-section">
      <h2>Today's Menu</h2>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <DishList
        dishes={menu}
        selectedCategory={selectedCategory}
        onView={handleView}
      />

      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        triggerRef={triggerRef}
      />
    </section>
  );
}

export default Menu;
