import React, { useState, useEffect } from 'react';
import { sampleFarmItems } from '../data.js'; 

const ITEMS_PER_PAGE = 9; 

const FarmsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedFarms, setDisplayedFarms] = useState([]);

  useEffect(() => {
    let items = sampleFarmItems;

    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (locationFilter) {
        items = items.filter(item => item.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedFarms(items.slice(startIndex, endIndex));

  }, [searchTerm, locationFilter, currentPage]);

  const totalFilteredItems = sampleFarmItems.filter(item => {
    let matchesSearch = true;
    let matchesLocation = true;
    if (searchTerm) {
        matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (locationFilter) {
        matchesLocation = item.location.toLowerCase().includes(locationFilter.toLowerCase());
    }
    return matchesSearch && matchesLocation;
  });
  const totalPages = Math.ceil(totalFilteredItems.length / ITEMS_PER_PAGE);

  return (
    <section id="farms-page">
      {/* Added animation class */}
      <h2 className="animate-fadeInDown">Farm Listing</h2>
      {/* Added animation class and delay */}
      <div className="filter-bar animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search farms..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
          <button type="button"><i className="fas fa-search"></i></button>
        </div>
        <div className="filter-options">
          <select className="filter-select" value={locationFilter} onChange={e => {setLocationFilter(e.target.value); setCurrentPage(1);}}>
            <option value="">All Locations</option>
            <option value="Catalunan Pequeno">Catalunan Pequeno</option>
            <option value="Bucana">Bucana</option>
            <option value="Panacan">Panacan</option>
            <option value="Calinan Proper">Calinan Proper</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
        </div>
      </div>

      <div className="farms-grid">
        {displayedFarms.length > 0 ? displayedFarms.map((farm, index) => (
          
          <div
            className="farm-item animate-fadeInUp"
            key={farm.id}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className="farm-item-content-wrapper">
              <img src={farm.image} alt={farm.name} />
              <h3>{farm.name}</h3>
              <p className="location">{farm.location}</p>
              <p className="description">{farm.description !== 'none' ? farm.description : 'More details coming soon.'}</p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert(`Viewing details for ${farm.name}`);}} className="btn btn-secondary">VIEW DETAILS</a>
          </div>
        )) : <p className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>No farms found matching your criteria.</p>}
      </div>

      {totalPages > 1 && (
        
        <div className="pagination animate-fadeInUp" style={{ animationDelay: `${0.4 + displayedFarms.length * 0.1}s` }}>
          {/* Added Prev button similar to ProducePage.jsx */}
          {currentPage > 1 && (
            <a
              href="#"
              className="prev"
              onClick={(e) => {e.preventDefault(); setCurrentPage(currentPage - 1)}}
              aria-label="Previous page"
            >
                « Prev
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <a
              href="#"
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </a>
          ))}
          {currentPage < totalPages && (
            <a
              href="#"
              className="next"
              onClick={(e) => {e.preventDefault(); setCurrentPage(currentPage + 1)}}
              aria-label="Next page"
            >
                Next »
            </a>
          )}
        </div>
      )}
    </section>
  );
};
export default FarmsPage;