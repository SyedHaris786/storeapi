const pool = require('../db/connectdb')


const allProducts = async (req,res)=>{
    try {
        
        const { page } = req.params;
    if (page >0 ){
        const allProducts = await pool.query(
          "SELECT product_id, product_name,price,product_description FROM products LIMIT 1 OFFSET $1",
          [page - 1]
        );
        res.json(allProducts.rows);
    } else {
      res.send("Page doesnot exist")
    }
      } catch (err) {
        console.error(err);
      }
}



const search = async (req,res)=>{
  try {

        const {keyword} = req.params;
console.log(keyword.length);
console.log(keyword);
        // if (keyword.length == 0){
        //   res.send('Please enter a valid search query')
        // } else {

          const searchQuery = await pool.query("select product_name,price from products where product_name like '%"+keyword+"%';");

          res.send(searchQuery.rows)
        // }


  } catch(err){
    console.error(err);
  }
}

const orders = async (req,res) => {

  const order = req.body;
  // res.send(order)

for (let i =0; i<order.length; i++){
    // console.log(order[i])
    const {user_id,product_id,address,quantity} = order[i];
    const delivered = 0;
    console.log(user_id,product_id,address,quantity);
    
    //insert into orders (user_id,product_id,delivered,address,quantity) VALUES (4,12,0,'karachi',1);
    
    const orderQuery = await pool.query("insert into orders (user_id,product_id,delivered,address,quantity) VALUES ($1,$2,$3,$4,$5);",[user_id,product_id,delivered,address,quantity]);

    res.end('Done')

}
}



module.exports = {allProducts,search,orders}
