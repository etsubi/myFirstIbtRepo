import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <h1>Welcome to Addis Eats </h1>

      <p>Discover delicious Ethiopian dishes and order your favorites.</p>

      <Link to="/menu">Explore Menu</Link>
    </section>
  );
}

export default Home;
