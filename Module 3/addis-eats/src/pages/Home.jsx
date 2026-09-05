import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO ADDIS EATS</p>

          <h1>
            Delicious Ethiopian
            <span>Food, Made for You.</span>
          </h1>

          <p className="hero-description">
            Discover authentic Ethiopian flavors, freshly prepared and delivered
            straight to your door.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Explore Menu
            </Link>

            <Link to="/checkout" className="secondary-button">
              View Cart
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/doro.jpg" alt="Delicious Ethiopian food" />
        </div>
      </section>

      <section className="home-features">
        <div className="feature">
          <span>🍛</span>
          <h3>Authentic Flavors</h3>
          <p>Traditional Ethiopian dishes made with love.</p>
        </div>

        <div className="feature">
          <span>🚴</span>
          <h3>Fast Delivery</h3>
          <p>Get your favorite meals delivered to you.</p>
        </div>

        <div className="feature">
          <span>❤️</span>
          <h3>Made Fresh</h3>
          <p>Fresh ingredients and delicious meals every day.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
