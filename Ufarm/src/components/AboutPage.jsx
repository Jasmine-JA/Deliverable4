import React from 'react';

const AboutPage = () => {
  return (
    <section id="about-us-page"> {/* Corresponds to contact.html in nav */}
      <div className="container"> {/* Optional: for consistent padding */}
        <h2>About Us</h2>
        <p>
          Welcome to Urban Harvest Hub, your premier online destination for connecting with local farmers
          and accessing the freshest, sustainably grown produce right from your community. Our mission is
          to bridge the gap between urban dwellers and local agriculture, fostering a healthier lifestyle
          and supporting our hardworking farmers.
        </p>
        <h3>Our Story</h3>
        <p>
          Urban Harvest Hub was born from a passion for fresh food and a desire to strengthen local
          food systems. We noticed a growing disconnect between consumers and the source of their food,
          especially in urban environments. We envisioned a platform where technology could bring
          the farm-to-table experience directly to your fingertips, making it easier than ever to
          eat healthy, support local economies, and reduce your carbon footprint.
        </p>
        <h3>What We Do</h3>
        <p>
          We provide a user-friendly platform where:
        </p>
        <ul>
          <li><strong>Consumers</strong> can discover and purchase a wide variety of fresh produce directly from local urban and peri-urban farms.</li>
          <li><strong>Farmers</strong> can showcase their products, reach a wider customer base, and manage their sales efficiently.</li>
        </ul>
        <p>
          Our platform features detailed profiles for each farm, information about their growing practices,
          and a diverse selection of seasonal fruits, vegetables, herbs, and more.
        </p>
        <h3>Our Commitment</h3>
        <ul>
          <li><strong>Freshness & Quality:</strong> We partner with farms that prioritize quality and sustainable farming methods.</li>
          <li><strong>Community Support:</strong> By buying through Urban Harvest Hub, you directly support local farmers and contribute to the local economy.</li>
          <li><strong>Sustainability:</strong> We champion farming practices that are kind to the environment, reducing food miles and promoting biodiversity.</li>
          <li><strong>Transparency:</strong> We believe in knowing where your food comes from. Our platform provides insights into each farm's story and practices.</li>
        </ul>
        <h3>Get Involved</h3>
        <p>
          Join the Urban Harvest Hub community today! Whether you're looking to buy fresh produce,
          a farmer wanting to sell your harvest, or simply someone passionate about local food,
          we welcome you.
        </p>
        <p>
          For inquiries, partnerships, or feedback, please don't hesitate to reach out to us through our feedback page.
        </p>
      </div>
    </section>
  );
};
export default AboutPage;