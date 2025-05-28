import React, { useState, useEffect } from 'react';
import { sampleProduceItems } from '../data.js'; 

const ITEMS_PER_PAGE = 9;

const ProducePage = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAndPagedProduce, setFilteredAndPagedProduce] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let items = sampleProduceItems;

    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.farmName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (seasonFilter) {
      items = items.filter(item => item.season === seasonFilter);
    }

    setTotalPages(Math.ceil(items.length / ITEMS_PER_PAGE));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFilteredAndPagedProduce(items.slice(startIndex, endIndex));

  }, [searchTerm, categoryFilter, seasonFilter, currentPage]);


  return (
    <section id="produce-page">
      {/* Added animation class */}
      <h2 className="animate-fadeInDown">Available Produce</h2>
      {/* Added animation class and delay */}
      <div className="filter-bar animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search produce..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
          <button type="button" aria-label="Search"><i className="fas fa-search"></i></button>
        </div>
        <div className="filter-options">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={e => {setCategoryFilter(e.target.value); setCurrentPage(1);}}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="herbs">Herbs</option>
          </select>
          <select
            className="filter-select"
            value={seasonFilter}
            onChange={e => {setSeasonFilter(e.target.value); setCurrentPage(1);}}
            aria-label="Filter by season"
          >
            <option value="">All Seasons</option>
            <option value="spring">Rainy</option>
            <option value="summer">Summer</option>
            <option value="all">All Year</option>
          </select>
        </div>
      </div>

      <div className="produce-grid">
        {filteredAndPagedProduce.length > 0 ? (
            filteredAndPagedProduce.map((item, index) => (
          
          <div
            className="produce-item animate-fadeInUp"
            key={item.id}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="farm-name">{item.farmName}</p>
            <p className="price">{item.price}</p>
            <button className="btn btn-primary add-to-cart" onClick={() => addToCart(item)}>ADD TO CART</button>
          </div>
        ))
        ) : (
            <p className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>No produce found matching your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        
        <div className="pagination animate-fadeInUp" style={{ animationDelay: `${0.4 + filteredAndPagedProduce.length * 0.1}s` }}>
          {currentPage > 1 && (
            <a href="#" className="prev" onClick={(e) => {e.preventDefault(); setCurrentPage(currentPage - 1)}} aria-label="Previous page">
                « Prev
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <a
              href="#"
              key={pageNumber}
              className={currentPage === pageNumber ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage(pageNumber); }}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </a>
          ))}
           {currentPage < totalPages && (
            <a href="#" className="next" onClick={(e) => {e.preventDefault(); setCurrentPage(currentPage + 1)}} aria-label="Next page">
                Next »
            </a>
          )}
        </div>
      )}
    </section>
  );
};
export default ProducePage;