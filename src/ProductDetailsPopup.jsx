/* eslint-disable react/prop-types */
import './ProductDetailsPopup.css'

const ProductDetailsPopup = ({ product, onClose }) => {
    console.log(product);

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>Close</button>
                <h2>{product.title}</h2>
                <img src={product.images[0]} alt={product.title} className="product-image" />
                <img src={product.images[1]} alt={product.title} className="product-image" />
                <img src={product.images[2]} alt={product.title} className="product-image" />
                <img src={product.images[3]} alt={product.title} className="product-image" />
                <p>{product.description}</p>
                <p><span className='bold'>Brand:</span> {product.brand}</p>
                <p><span className='bold'>Category:</span> {product.category}</p>
                <p><span className='bold'>Price:</span> ${product.price}</p>
                <p><span className='bold'>Discount Percentage:</span> {product.discountPercentage}%</p>
                <p><span className='bold'>Rating:</span> {product.rating}</p>
                <p><span className='bold'>Stock: </span>{product.stock}</p>
            </div>
        </div>
    );
};

export default ProductDetailsPopup;
