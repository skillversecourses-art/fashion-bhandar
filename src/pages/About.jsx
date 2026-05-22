export default function About() {
  const values = [
    { icon: "🌿", title: "Sustainable", desc: "Every piece is made with eco-conscious materials and ethical manufacturing processes." },
    { icon: "✂️", title: "Quality Crafted", desc: "Meticulous attention to detail in every stitch, seam, and fabric choice we make." },
    { icon: "💡", title: "Trend-Forward", desc: "We blend timeless silhouettes with the freshest seasonal trends from global runways." },
    { icon: "❤️", title: "Community First", desc: "Built for real people — our community shapes our collections and drives our vision." },
  ];

  const U = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`;

  const team = [
    { name: "Aisha Khan",  role: "Founder & Creative Director", img: U("1664202526047-405824c633e7") },
    { name: "Rahul Mehta", role: "Head of Design",               img: U("1573879500655-98f2012dd1db") },
    { name: "Sofia Mirza", role: "Brand & Marketing",            img: U("1546213290-e1b492ab3eee")  },
    { name: "James Lee",   role: "Operations Manager",           img: U("1612423284934-2850a4ea6b0f") },
  ];

  return (
    <main className="about-page">
      <div className="about-hero">
        <h1>About Fashion Bhandar</h1>
        <p>
          Born from a passion for wearable art, Fashion Bhandar is where modern
          style meets mindful living. We believe fashion should feel as good as
          it looks.
        </p>
      </div>

      <div className="about-content">
        <div className="about-grid">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&auto=format&q=80"
            alt="Our atelier"
          />
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Fashion Bhandar was founded in 2018 with a simple belief: that
              beautiful clothing should be accessible, sustainable, and
              effortlessly wearable every day.
            </p>
            <p>
              What began as a small studio in Mumbai has grown into a beloved
              brand with customers across the globe. We work directly with
              skilled artisans and ethical factories, ensuring every garment
              meets our high standards for quality and responsibility.
            </p>
            <p>
              Our collections are inspired by the vibrancy of Indian culture
              fused with contemporary global fashion — a bridge between
              tradition and modernity.
            </p>
          </div>
        </div>

        <div className="section-header">
          <p className="section-label">What Drives Us</p>
          <h2>Our Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div className="value-card" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="team-section">
        <p className="section-label">The People Behind the Brand</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem" }}>
          Meet Our Team
        </h2>
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <img src={member.img} alt={member.name} />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
