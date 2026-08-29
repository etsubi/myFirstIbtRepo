function CategoryBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
