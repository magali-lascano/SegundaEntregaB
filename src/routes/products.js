import { Router } from 'express';
//import manager from "../dao/managers/productmanager";
import ProductManager from "../dao/controllers/product.controller.mdb.js";

const manager1 = new ProductManager();
const router = Router();
router.get('/paginated', async (req, res) => {
    try {
        const pagprod = await controller.getProductsPaginated()
        res.status(200).send({ status: 'OK', data: products })
    } catch (error) {
        res.status(500).send({ status: 'ERR', data: error.message})
    }
});
router.get('/api/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.json(products);
});

router.get('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const product = products.find((p) => p.id === pid);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ message: 'No hallado' });
    }
});

router.post('/api/products', (req, res) => {
    const newProduct = req.body;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    newProduct.id = generateNewProductId(products);
    products.push(newProduct);
    fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
    res.json(newProduct);
});

router.put('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json(products[index]);
    } else {
    res.status(404).json({ message: 'No hallado' });
    } 
});

router.delete('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
    products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json({message: 'Producto Borrado'});
    } else {
    res.status(404).json({message: 'No hallado'});
    }
});

export default router