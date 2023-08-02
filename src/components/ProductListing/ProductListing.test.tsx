import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductListing from "./ProductListing";

// Mock the onRemove, onIncrement, and onDecrement functions
const mockOnRemove = jest.fn();
const mockOnIncrement = jest.fn();
const mockOnDecrement = jest.fn();

describe("ProductListing", () => {
    beforeEach(() => {
        // Reset the mock functions before each test
        mockOnRemove.mockClear();
        mockOnIncrement.mockClear();
        mockOnDecrement.mockClear();
    });

    it("should render 'No products added yet.' when the products list is empty", () => {
        render(<ProductListing products={[]} onRemove={mockOnRemove} onIncrement={mockOnIncrement} onDecrement={mockOnDecrement} />);
        expect(screen.getByText("No products added yet.")).toBeInTheDocument();
    });

    it("should render product items correctly when the products list is not empty", () => {
        const products = [
            { productName: "Product 1", quantity: 5 },
            { productName: "Product 2", quantity: 10 },
        ];

        render(<ProductListing products={products} onRemove={mockOnRemove} onIncrement={mockOnIncrement} onDecrement={mockOnDecrement} />);

        const productElements = screen.getAllByRole("listitem");
        expect(productElements.length).toBe(products.length);

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();

        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("should call onRemove when the 'Remove' button is clicked", () => {
        const products = [{ productName: "Product 1", quantity: 5 }];
        render(<ProductListing products={products} onRemove={mockOnRemove} onIncrement={mockOnIncrement} onDecrement={mockOnDecrement} />);

        const removeButton = screen.getByText("Remove");
        fireEvent.click(removeButton);

        expect(mockOnRemove).toHaveBeenCalledTimes(1);
        expect(mockOnRemove).toHaveBeenCalledWith(0);
    });

    it("should call onIncrement when the '+' button is clicked", () => {
        const products = [{ productName: "Product 1", quantity: 5 }];
        render(<ProductListing products={products} onRemove={mockOnRemove} onIncrement={mockOnIncrement} onDecrement={mockOnDecrement} />);

        const incrementButton = screen.getByText("+");
        fireEvent.click(incrementButton);

        expect(mockOnIncrement).toHaveBeenCalledTimes(1);
        expect(mockOnIncrement).toHaveBeenCalledWith(0);
    });

    it("should call onDecrement when the '-' button is clicked", () => {
        const products = [{ productName: "Product 1", quantity: 5 }];
        render(<ProductListing products={products} onRemove={mockOnRemove} onIncrement={mockOnIncrement} onDecrement={mockOnDecrement} />);

        const decrementButton = screen.getByText("-");
        fireEvent.click(decrementButton);

        expect(mockOnDecrement).toHaveBeenCalledTimes(1);
        expect(mockOnDecrement).toHaveBeenCalledWith(0);
    });
});
