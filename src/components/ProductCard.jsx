import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const badgeClass = product.badge
    ? `product-badge ${product.badge.toLowerCase()}`
    : null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || null, product.colors?.[0] || null);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || null, product.colors?.[0] || null);
    navigate("/checkout");
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="img-container">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={badgeClass}>{product.badge}</span>
        )}
        {discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}
        <div className="card-actions-overlay">
          <button
            className="card-action-btn card-cart-btn"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            🛒 Add to Cart
          </button>
          <button
            className="card-action-btn card-buy-btn"
            onClick={handleBuyNow}
            title="Buy Now"
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
