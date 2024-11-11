import express from "express";
import { addItem } from "./controllers/cartController";
import { checkout } from "./controllers/checkoutController";


const app = express();
app.use(express.json());

app.post("/cart/add-item", addItem);
app.post("/cart/checkout", checkout);

export default app;
