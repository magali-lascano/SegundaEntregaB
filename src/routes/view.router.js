import { Router } from "express";
import ProductManager from "../dao/controllers/product.controller.mdb.js";

const router = Router();

router.get("/", async(req, res) => {
    const products = await ProductManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", async(req, res) => {
    const products = await ProductManager.getProducts();
    res.render("realtimeproducts", { products });
});

router.get("/chat", (req, res) => {
    res.render("chat")
})

export default router;