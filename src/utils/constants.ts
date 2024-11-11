

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export const STORE: { [key: string]: Product } = {
    "prod-001": { id: "prod-001", name: "Laptop", price: 1000, stock: 10 },
    "prod-002": { id: "prod-002", name: "Smartphone", price: 500, stock: 20 },
    "prod-003": { id: "prod-003", name: "Headphones", price: 100, stock: 50 },
    "prod-004": { id: "prod-004", name: "Smartwatch", price: 150, stock: 30 },
    "prod-005": { id: "prod-005", name: "Tablet", price: 300, stock: 15 },
};