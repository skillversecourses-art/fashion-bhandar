import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="pd-not-found">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate("/checkout");
  };

  // Get related products (same category, different id)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="product-detail-page">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span className="pd-sep">›</span>
        <Link to="/shop">Shop</Link>
        <span className="pd-sep">›</span>
        <span>{product.name}</span>
      </div>

      <div className="pd-grid">
        {/* Product Image */}
        <div className="pd-image-section">
          <div className="pd-main-image">
            <img src={product.image} alt={product.name} />
            {product.badge && (
              <span className={`product-badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="discount-badge pd-discount">-{discount}%</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="pd-info-section">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-price-block">
            <span className="pd-price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <>
                <span className="pd-original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="pd-savings">
                  You save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>

          <p className="pd-description">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pd-option-group">
              <label className="pd-option-label">Size</label>
              <div className="pd-option-chips">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-chip${selectedSize === size ? " active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="pd-option-group">
              <label className="pd-option-label">Color</label>
              <div className="pd-option-chips">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`pd-chip${selectedColor === color ? " active" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="pd-option-group">
            <label className="pd-option-label">Quantity</label>
            <div className="pd-quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pd-actions">
            <button className="pd-add-cart-btn" onClick={handleAddToCart}>
              {addedFeedback ? "✓ Added to Cart!" : "🛒 Add to Cart"}
            </button>
            <button className="pd-buy-now-btn" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="pd-trust-badges">
            <div className="pd-trust-item">
              <span>🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <small>On orders above ₹999</small>
              </div>
            </div>
            <div className="pd-trust-item">
              <span>🔄</span>
              <div>
                <strong>Easy Returns</strong>
                <small>30-day return policy</small>
              </div>
            </div>
            <div className="pd-trust-item">
              <span>🛡️</span>
              <div>
                <strong>Secure Payment</strong>
                <small>100% secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pd-related">
          <h2>You May Also Like</h2>
          <div className="products-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
