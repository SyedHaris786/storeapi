const { json } = require("express/lib/response");
const pool = require("../db/connectdb");
// const url = require('url')

const products = async (req, res) => {
  try {
    // Another solution to get the url paramaters
    // const queryObject = url.parse(req.url, true).query;
    // const offset = queryObject.page - 1 ;

    const { page } = req.params;

    const allProducts = await pool.query(
      "SELECT * FROM products LIMIT 1 OFFSET $1",
      [page - 1]
    );
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err);
  }
};

const addProduct = async (req, res) => {
  try {
    // DB columns: product_name | category  | price | product_description | stock_qty

    const { productname, category, price, description, qty } = req.body;

    const insertProduct = await pool.query(
      "INSERT INTO products(product_name,category,price,product_description,stock_qty) VALUES ($1,$2,$3,$4,$5)",
      [productname, category, price, description, qty]
    );

    res.send("Product added successfully");
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    //DB columns: product_name | category  | price | product_description | stock_qty
    const { id, productname, category, price, description, qty } = req.body;

    const checkID = await pool.query(
      "select exists(select product_name from products where product_id=$1);",
      [id]
    );
    const check = checkID.rows[0].exists;

    if (check) {
      const editProduct = await pool.query(
        "UPDATE products SET product_name = $1, category= $2, price = $3, product_description = $4, stock_qty = $5 WHERE product_id = $6",
        [productname, category, price, description, qty, id]
      );

      res.send("Product edited successfully");
    } else {
      res.send("Product doesnot exist");
    }
  } catch (err) {
    console.error(err);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const checkID = await pool.query(
      "select exists(select product_name from products where product_id=$1);",
      [id]
    );
    const check = checkID.rows[0].exists;

    if (check) {
      const removeProduct = await pool.query(
        "DELETE FROM products WHERE product_id = $1",
        [id]
      );
      res.send("Product deleted successfully");
    } else {
      res.send("Product doesnot exist");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { products, addProduct, updateProduct, removeProduct };
