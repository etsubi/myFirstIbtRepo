import { useSearchParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import DishList from "../components/DishList";
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
function Menu({ onTotalChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  const handleAdd = (price) => {
    if (onTotalChange) {
      onTotalChange((previousTotal) => previousTotal + price);
    }
  };
  return (
    <section className="menu-section">
      {" "}
      <h2>Today's Menu</h2>{" "}
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />{" "}
      <DishList
        dishes={menu}
        selectedCategory={selectedCategory}
        onAdd={handleAdd}
      />{" "}
    </section>
  );
}
export default Menu;
