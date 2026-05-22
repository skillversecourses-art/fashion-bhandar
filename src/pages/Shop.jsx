import { useState } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main className="shop-page">
      <div className="shop-header">
        <h1>Our Collection</h1>
        <p>Explore {products.length} handpicked pieces for every occasion</p>
      </div>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${active === cat ? " active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-soft)", marginTop: "3rem" }}>
          No products found in this category.
        </p>
      )}
    </main>
  );
}
