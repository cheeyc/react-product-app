import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import AddProduct from "./AddProduct";

const mockSubmit = jest.fn();

describe("AddProduct", () => {
    beforeEach(() => {
        mockSubmit.mockClear();
    });

    it("should render correctly", () => {
        render(<AddProduct onSubmit={mockSubmit}/>);
        expect(screen.getByRole("button", {name: /add product/i})).toBeInTheDocument();
    });

    it("should call onSubmit with the correct values when the form is submitted", () => {
        render(<AddProduct onSubmit={mockSubmit}/>);

        const productNameInput = screen.getByLabelText("Product Name");
        const quantityInput = screen.getByLabelText("Quantity");
        const addButton = screen.getByRole("button", {name: /add product/i});

        fireEvent.change(productNameInput, {target: {value: "Test Product"}});
        fireEvent.change(quantityInput, {target: {value: "10"}});

        fireEvent.click(addButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            productName: "Test Product",
            quantity: 10,
        });
    });

    it("should reset the form fields after submitting", () => {
        render(<AddProduct onSubmit={mockSubmit}/>);

        const productNameInput = screen.getByLabelText("Product Name");
        const quantityInput = screen.getByLabelText("Quantity");
        const addButton = screen.getByRole("button", {name: /add product/i});

        fireEvent.change(productNameInput, {target: {value: "Test Product"}});
        fireEvent.change(quantityInput, {target: {value: "10"}});

        fireEvent.click(addButton);

        expect(productNameInput).toHaveValue("");
        expect(quantityInput).toHaveValue(0);
    });
});
