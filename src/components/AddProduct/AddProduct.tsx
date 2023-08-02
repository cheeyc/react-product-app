import React, {useState} from "react";
import {Product} from "../../model/Product";

interface Props {
    onSubmit: (product: Product) => void;
};
const AddProduct: React.FC<Props> = ({onSubmit}) => {
    const [productName, setProductName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit({productName, quantity});
        setProductName("");
        setQuantity(0);
    };

    const handleProductNameChange = (event: any) => setProductName(event.target.value);
    const handleQuantityChange = (event: any) => setQuantity(+event.target.value);

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="productNameInput">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={handleProductNameChange}
                        id="productNameInput"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="quantityInput">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={handleQuantityChange}
                        id="quantityInput"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
