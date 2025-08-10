import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const spareParts = [
  {
    id: 1,
    name: "Front Brake Pad",
    category: "Brakes",
    image: "https://m.media-amazon.com/images/I/81hf68N2GkL._SL1500_.jpg",
    price: "₹1,200",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Rear Brake Pad",
    category: "Brakes",
    image: "https://m.media-amazon.com/images/I/61E6B06uA7L._SL1500_.jpg",
    price: "₹1,050",
    availability: "Out of Stock",
  },
  {
    id: 3,
    name: "Air Filter",
    category: "Filters",
    image: "https://m.media-amazon.com/images/I/81T80ibn2HL._SL1500_.jpg",
    price: "₹450",
    availability: "In Stock",
  },
  {
    id: 4,
    name: "Oil Filter",
    category: "Filters",
    image: "https://m.media-amazon.com/images/I/71+H9H80YvL._SL1500_.jpg",
    price: "₹350",
    availability: "In Stock",
  },
  {
    id: 5,
    name: "Clutch Plate",
    category: "Clutch",
    image: "https://m.media-amazon.com/images/I/91rDHM8ZQCL._SL1500_.jpg",
    price: "₹2,800",
    availability: "Limited Stock",
  },
  {
    id: 6,
    name: "Fan Belt",
    category: "Engine",
    image: "https://m.media-amazon.com/images/I/71Jz4fX2BvL._SL1500_.jpg",
    price: "₹600",
    availability: "In Stock",
  },
  {
    id: 7,
    name: "Timing Belt",
    category: "Engine",
    image: "https://m.media-amazon.com/images/I/81LK3K-r2fL._SL1500_.jpg",
    price: "₹950",
    availability: "Out of Stock",
  },
];

const categories = ["All", ...new Set(spareParts.map((p) => p.category))];
const variants = ["Petrol", "Diesel", "CNG", "Electric"];
const years = ["2020", "2021", "2022", "2023", "2024"];

const SparePartsPage = ({store}) => {
  const { modelName } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (category) => setSelectedCategory(category);

  const filteredParts = spareParts.filter((part) => {
    const matchesCategory = selectedCategory === "All" || part.category === selectedCategory;
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 
  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#111828", minHeight: "100vh", color: "#f1f1f1" }}
    >
      <h2 className="text-center mb-4 text-light">
        Spare Parts for <span className="text-info">{modelName}</span>
      </h2>

      {/* Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="🔍 Search spare parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select bg-dark text-light border-secondary"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            <option value="" disabled>
              🔧 Select Variant
            </option>
            <option value="All">All</option>
            {variants.map((variant, i) => (
              <option key={i} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select bg-dark text-light border-secondary"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="" disabled>
              📅 Select Year
            </option>
            <option value="All">All</option>
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`btn ${selectedCategory === cat ? "btn-light" : "btn-outline-light"}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spare Parts List */}
      <div className="row">
        {filteredParts.length > 0 ? (
          filteredParts.map((part) => (
            <div className="col-sm-6 col-lg-3 col-md-4 mb-2" key={part.id}>
              <div className="card bg-dark text-light border-secondary shadow-sm h-100"
                onClick={() => 
                  
                  navigate(`/product/${part.id}`)}
              >
                <img
                  src={'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg'}
                  className="card-img-top"
                  alt={part.name}
                  style={{ height: "auto", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{part.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {part.category}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Price:</strong> {part.price}
                  </p>
                  <p
                    className={`card-text ${
                      part.availability === "Out of Stock" ? "text-danger" : "text-success"
                    }`}
                  >
                    <strong>Availability:</strong> {part.availability}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No spare parts found.</p>
        )}
      </div>
    </div>
  );
};

export default SparePartsPage;
