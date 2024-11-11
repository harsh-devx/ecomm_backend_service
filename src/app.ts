import express from "express";
import { addItem } from "./controllers/cartController";
import { checkout } from "./controllers/checkoutController";
import adminRouter from "./controllers/adminController";

const app = express();
app.use(express.json());

app.post("/cart/add-item", addItem);
app.post("/cart/checkout", checkout);

app.use("/admin", adminRouter);

export default app;
