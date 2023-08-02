import React from "react";
import {Product} from "../../model/Product";

interface Props {
    products: Product[];
    onRemove: (index: number) => void;
    onIncrement: (index: number) => void;
    onDecrement: (index: number) => void;
}

const ProductListing: React.FC<Props> = ({products, onRemove, onIncrement, onDecrement}) => {
    return (
        <div>
            <h2>Product Listing</h2>
            {products.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                <ul className="list-group">
                    {products.map((product: Product, index: number) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <div>
                                <span>{product.productName}</span>
                                <span className="badge bg-secondary mx-2">{product.quantity}</span>
                            </div>
                            <div>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => onRemove(index)}
                                    hidden={product.quantity !== 0}
                                >
                                    Remove
                                </button>
                                <button className="btn btn-primary mx-2" onClick={() => onIncrement(index)}>+</button>
                                <button className="btn btn-primary mx-2" onClick={() => onDecrement(index)}>-</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductListing;
