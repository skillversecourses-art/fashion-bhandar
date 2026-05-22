import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const U = (id, w = 600, h = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const marqueeItems = [
  "Free Shipping Over ₹999",
  "New Spring Collection 2025",
  "100% Authentic Clothing",
  "Up to 40% Off Sale Items",
  "Easy 30-Day Returns",
  "Exclusive Member Offers",
];

const categories = [
  { name: "Dresses",  img: U("1567966456076-905a50a06d8c", 400, 400) },
  { name: "Jackets",  img: U("1551028719-00167b16eac5",   400, 400) },
  { name: "Knitwear", img: U("1532453288672-3a27e9be9efd", 400, 400) },
  { name: "T-Shirts", img: U("1521572163474-6864f9cf17ab", 400, 400) },
  { name: "Pants",    img: U("1602370463198-086436840055", 400, 400) },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        {/* Left — text */}
        <div className="hero-left">
          <span className="hero-tag">New Collection 2025</span>
          <h1>
            Style That<br />
            Speaks <em>Louder</em><br />
            Than Words
          </h1>
          <p className="hero-desc">
            Discover curated fashion at Fashion Bhandar — where contemporary
            style meets everyday comfort. Pieces designed to make you feel
            extraordinary, every single day.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn-primary">Shop Collection</Link>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Products</div>
            </div>
            <div>
              <div className="hero-stat-num">12K+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">Brands</div>
            </div>
          </div>
        </div>

        {/* Right — jacket showcase */}
        <div className="hero-right">
          <span className="jacket-label">New Arrival</span>

          <div className="hero-jacket-wrap">
            <img src={`${import.meta.env.BASE_URL}jacket.png`} alt="Varsity Jacket" />
          </div>

          <div className="hero-right-badge">
            <div className="hero-badge-icon">🚚</div>
            <div className="hero-badge-text">
              <strong>Free Shipping</strong>
              <span>On orders over ₹999</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-item" key={i}>
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Auto-scroll products */}
      <section className="auto-scroll-section">
        <div className="section-header">
          <p className="section-label">Trending Now</p>
          <h2>Products You'll Love</h2>
        </div>

        <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
          <div className="scroll-row">
            {[...products, ...products].map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="scroll-row reverse">
            {[...products].reverse().concat([...products].reverse()).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <p className="section-label">Browse By</p>
          <h2>Shop Categories</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link to="/shop" key={cat.name} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <div className="category-overlay">
                <span className="category-name">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <p className="section-label">Hand-Picked</p>
          <h2>Featured Collection</h2>
        </div>
        <div className="products-grid">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/shop" className="btn-primary">View All Products</Link>
        </div>
      </section>

      {/* Banner CTA */}
      <section style={{
        background: "var(--cream-mid)",
        padding: "5rem 3rem",
        textAlign: "center",
        borderTop: "1px solid var(--border)",
      }}>
        <p style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem", fontWeight: 700 }}>
          Limited Time
        </p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-1px", marginBottom: "1rem" }}>
          Up to 40% Off — Seasonal Sale
        </h2>
        <p style={{ color: "var(--text-mid)", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
          Shop our biggest sale of the season. Limited stock available.
        </p>
        <Link to="/shop" className="btn-primary">Shop the Sale</Link>
      </section>
    </>
  );
}
