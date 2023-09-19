/* eslint-disable react/prop-types */
import './ProductDetailsPopup.css'

const ProductDetailsPopup = ({ product, onClose }) => {
    console.log(product);

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>Close</button>
                <h2>{product.title}</h2>
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="product-image"
                    />
                ))}
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
