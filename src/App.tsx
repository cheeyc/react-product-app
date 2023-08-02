import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductListing from "./components/ProductListing/ProductListing";
import {Product} from "./model/Product";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const handleAddProduct = (product: Product) => {
        setProducts((prevState: Product[]) => [...prevState, product]);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts: Product[] = products.filter((_: Product, i: number) => i !== index);
        setProducts(updatedProducts);
    };

    const handleIncrement = (index: number) => {
        setProducts((prevState: Product[]) => {
            const updatedProducts: Product[] = [...prevState];
            updatedProducts[index] = {
                ...updatedProducts[index],
                quantity: updatedProducts[index].quantity + 1,
            };
            return updatedProducts;
        });
    };

    const handleDecrement = (index: number) => {
        setProducts((prevState: Product[]) => {
            const updatedProducts: Product[] = [...prevState];
            updatedProducts[index] = {
                ...updatedProducts[index],
                quantity: Math.max(0, updatedProducts[index].quantity - 1),
            };
            return updatedProducts;
        });
    };

    return (
        <BrowserRouter>
            <div className="container mt-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Product Listing</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<AddProduct onSubmit={handleAddProduct}/>}/>
                    <Route path="/products" element={<ProductListing
                        products={products}
                        onRemove={handleRemoveProduct}
                        onDecrement={handleDecrement}
                        onIncrement={handleIncrement}
                    />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
