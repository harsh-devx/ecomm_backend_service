import express from "express";
import { addItem } from "./controllers/cartController";


const app = express();
app.use(express.json());

app.post("/cart/add-item", addItem);

export default app;
