import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>Fashion <span>Bhandar</span></h2>
          <p>
            Redefining contemporary fashion with timeless pieces crafted for
            the modern wardrobe. Quality you can feel, style you can trust.
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", lineHeight: 1.7, marginTop: "-0.5rem" }}>
            📍 Mumbai, Maharashtra — 400104<br />
            🧾 GST: 27ARVPH9924N1ZQ
          </p>
          <div className="footer-social">
            {["📘", "📸", "🐦", "📌"].map((icon, i) => (
              <div className="social-link" key={i}>{icon}</div>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop">New Arrivals</Link></li>
            <li><Link to="/shop">Bestsellers</Link></li>
            <li><Link to="/shop">Sale</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Newsletter</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "1rem", lineHeight: 1.6 }}>
            Get exclusive deals &amp; style tips delivered to your inbox.
          </p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fashion Bhandar. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
