import { Router } from 'express';
//const fs = require('fs');
const router = Router();
const cartFilePath = '../json/carrito.json';
import cartManager  from "../dao/controllers/cart.controller.mdb.js";

//const carts = [];
const cartManager2 = new cartManager("/carrito.json");

router.post('/api/carts', (req, res) => {
    const newCart = req.body;
    newCart.id = generateNewCartId();
    fs.writeFileSync(cartFilePath, JSON.stringify(newCart, null, 2));
    res.json(newCart);
});

router.get('/api/carts/:cid', (req, res) => {
    const cid = req.params.cid;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    if (cart.id === cid) {
    res.json(cart.products);
    } else {
    res.status(404).json({ message: 'Carrito no existente' });
    }
});

router.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    const productIndex = cart.products.findIndex((p) => p.product_id === pid);
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
        } else {
        cart.products.push({ id: pid, quantity: quantity });
    }
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
    res.json(cart);
});

function NewProductId(products) {
    let mId = 0;
    for (const product of products) {
    if (product.id > mId) 
    {mId = product.id;}
    }
return mId + 1;
}

function generateNewCartId() {
    let mId = 0;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    if (cart && cart.id) {
    mId = parseInt(cart.id);
    }
    return (mId + 1).toString();
}

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const checkIdProduct = await pm.getProductById(pid);
      if (!checkIdProduct) {
        return res.status(404).send({ status: 'error', message: `Producto con ID: ${pid} no hallado` });
      }
      const checkIdCart = await cm.getCartById(cid);
      if (!checkIdCart) {
        return res.status(404).send({ status: 'error', message: `Carrito con ID: ${cid} no hallado` });
      }
      const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
      if (findProductIndex === -1) {
        return res.status(404).send({ status: 'error', message: `Producto con ID: ${pid} no hallado en carrito` });
      }
      checkIdCart.products.splice(findProductIndex, 1);
      const updatedCart = await cm.deleteProductInCart(cid, checkIdCart.products);
      return res.status(200).send({ status: 'success', message: `Producto con ID: ${pid} borrado`, cart: updatedCart });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', message: 'Se produjo un error' });
    }
  });
  
  router.delete('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cm.getCartById(cid);
      if (!cart) {
        return res.status(404).send({ message: `Carrito con ID: ${cid} no encontrado` });
      }
      if (cart.products.length === 0) {
        return res.status(404).send({ message: 'El carrito ya está vacío' });
      }
      cart.products = [];
      await cm.updateOneProduct(cid, cart.products);
      return res.status(200).send({
        status: 'success',
        message: `El carrito con ID: ${cid} fue vaciado correctamente`,
        cart: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Se produjo un error' });
    }
  });

export default router