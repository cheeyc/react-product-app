import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("should render the AddProduct component when the 'Add Product' link is clicked", () => {
        render(<App/>);

        const addProductLink = screen.getByRole("link", { name: /add product/i });
        fireEvent.click(addProductLink);

        const productNameInput = screen.getByLabelText("Product Name");
        expect(productNameInput).toBeInTheDocument();
    });

    it("should add a new product when submitted in AddProduct", () => {
        render(<App/>);

        const productNameInput = screen.getByLabelText("Product Name");
        const quantityInput = screen.getByLabelText("Quantity");
        const addButton = screen.getByRole("button", {name: "Add Product"});

        fireEvent.change(productNameInput, {target: {value: "New Product"}});
        fireEvent.change(quantityInput, {target: {value: "10"}});
        fireEvent.click(addButton);

        const productLink = screen.getByText("Product Listing");
        fireEvent.click(productLink);

        const newProductName = screen.getByText("New Product");
        expect(newProductName).toBeInTheDocument();
    });

    it("should render the ProductListing component when the 'Product Listing' link is clicked", () => {
        render(<App/>);

        const productListingLink = screen.getByRole("link", { name: /product listing/i });

        fireEvent.click(productListingLink);

        const noProductsMessage = screen.getByText("No products added yet.");
        expect(noProductsMessage).toBeInTheDocument();
    });
});
