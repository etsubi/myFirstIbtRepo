import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

const menu = [
  {
    id: 1,
    name: "Doro Wat",
    price: 240,
    category: "Stew",
    spicy: true,
  },
  {
    id: 2,
    name: "Shiro",
    price: 120,
    category: "Stew",
    spicy: false,
  },
  {
    id: 3,
    name: "Tibs",
    price: 280,
    category: "Meat",
    spicy: true,
  },
  {
    id: 4,
    name: "Kitfo",
    price: 320,
    category: "Meat",
    spicy: false,
  },
  {
    id: 5,
    name: "Firfir",
    price: 150,
    category: "Breakfast",
    spicy: true,
  },
  {
    id: 6,
    name: "Injera Combo",
    price: 350,
    category: "Special",
    spicy: false,
  },
];

const categories = ["All", "Stew", "Meat", "Breakfast", "Special"];

function Menu({ onTotalChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAdd = (price) => {
    onTotalChange((previousTotal) => previousTotal + price);
  };

  return (
    <section className="menu-section">
      <h2>Today's Menu</h2>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <DishList
        dishes={menu}
        selectedCategory={selectedCategory}
        onAdd={handleAdd}
      />
    </section>
  );
}

export default Menu;
