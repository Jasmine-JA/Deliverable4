import React from 'react';

const HomePage = ({ showPage }) => {
  return (
    <section id="homepage">
      <div className="hero">
        {/* Added animation class and delay */}
        <h2 className="animate-fadeInDown">WELCOME TO URBAN HARVEST HUB</h2>
        {/* Added animation class and delay */}
        <p className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          Your source for locally grown produce
        </p>
        {/* Added animation class and delay */}
        <button
          onClick={() => showPage('produce')}
          className="btn btn-primary animate-fadeIn"
          style={{ animationDelay: '0.6s' }}
        >
          SHOP NOW
        </button>
      </div>

      <div className="featured-section">
        {/* Added animation class and delay */}
        <h3 className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          FEATURED FARMS
        </h3>
        <div className="image-gallery">
          {/* Added animation class and staggered delays for gallery items */}
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '1.0s' }}>
            <img src="/images/farm1.jpg" alt="Community Garden" />
            <p>Community Garden</p>
          </div>
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <img src="/images/farm2.jpg" alt="Rooftop Farm" />
            <p>Rooftop Farm</p>
          </div>
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
            <img src="/images/farm3.jpg" alt="Urban Farm" />
            <p>VegaVerticals</p>
          </div>
        </div>
      </div>

      <div className="featured-section">
        {/* Added animation class and delay */}
        <h3 className="animate-fadeInUp" style={{ animationDelay: '1.6s' }}>
          SEASONAL PRODUCE
        </h3>
        <div className="image-gallery">
          {/* Added animation class and staggered delays for gallery items */}
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
            <img src="/images/ampalaya.jpg" alt="Ampalaya" />
            <p>Ampalaya (Bitter Gourd)</p>
          </div>
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
            <img src="/images/okra.jpg" alt="Okra" />
            <p>Okra (Lady Finger)</p>
          </div>
          <div className="gallery-item animate-fadeInUp" style={{ animationDelay: '2.2s' }}>
            <img src="/images/kangkong.jpg" alt="Kangkong" />
            <p>Kangkong (Water Spinach)</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;