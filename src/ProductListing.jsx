import { useState, useEffect, useRef } from 'react';
import './ProductListing.css';
import ProductDetailsPopup from './ProductDetailsPopup';

const ProductListing = () => {
    const [prod, setProd] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productListingRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [limit, selectedCategory]);

    const fetchData = () => {
        setIsLoading(true);
        setError(null);

        // Build the API URL based on the selectedCategory
        let apiUrl = 'https://dummyjson.com/products';
        if (selectedCategory !== 'All') {
            apiUrl = `https://dummyjson.com/products/category/${selectedCategory}`;
        }

        fetch(`${apiUrl}?limit=${limit}`)
            .then((response) => response.json())
            .then((data) => {
                setProd(data.products);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleScroll = () => {
        const scrollPosition = window.innerHeight / 2 + document.documentElement.scrollTop;
        const isCloseToEnd = scrollPosition >= document.documentElement.offsetHeight / 2;

        if (isCloseToEnd && !isLoading && limit <= 100) {
            setLimit((prevLimit) => prevLimit + 3);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const categoryOptions = [
        'All',
        'smartphones',
        'laptops',
        'fragrances',
        'skincare',
        'groceries',
        'home-decoration',
        'furniture',
        'tops',
        'womens-dresses',
        'womens-shoes',
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
        'womens-watches',
        'womens-bags',
        'womens-jewellery',
        'sunglasses',
        'automotive',
        'motorcycle',
        'lighting',
    ];

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setLimit(6); // Reset the limit when changing categories
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the product details pop-up
    const closeProductDetails = () => {
        setSelectedProduct(null);
    };


    return (
        <div className="product-listing" ref={productListingRef}>
            <div className="category-filter">
                <label htmlFor="categorySelect">Select a Category:</label>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            {prod.map((item) => (
                <div className="product-card" key={item.id} onClick={() => openProductDetails(item)}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="product-details">
                        <h3 className="product-title">{item.title}</h3>
                        <p className="product-description">{item.description.substr(0, 40)}...</p>
                    </div>
                    <p className="product-price">${item.price}</p>
                    <button className="buy-button">Buy</button>
                </div>
            ))}
            {error && (
                <div className="error">
                    Error in loading
                </div>
            )}
            {selectedProduct && (
                <ProductDetailsPopup
                    product={selectedProduct}
                    onClose={closeProductDetails}
                />
            )}
        </div>
    );
};

export default ProductListing;
