import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./products.json");

const app = express();

app.get("/products/:id", async (req, res) => {
  //localhost:8080/products/2
  const { id } = req.params;
  const products = await manager.getProducts();
  const ProductId = products.find((prod) => prod.id === parseInt(id));
  if (!ProductId) {
    res.send("Producto no encontrado");
  } else {
    res.send(ProductId);
  }
});

app.get("/products", async (req, res) => {
  //localhost:8080/products?limit=3&ciudad=barcelona
  const { limit } = req.query;
  const products = await manager.getProducts();
  if (limit == undefined) {
    res.send(products);
  } else {
    const ProductLimit = products.slice(0, parseInt(limit));
    res.send(ProductLimit);
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
