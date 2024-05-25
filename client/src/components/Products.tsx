import  { useEffect, useState } from "react";
import  { useCart } from "../context/CardContext";
import { Product } from "../modules/Types";

const Products = () => {
 const [products, setProducts] = useState<Product[]>([]);
 const { addToCart } = useCart();
 useEffect(() => {
   const fetchProducts = async () => {
     const response = await fetch("http://localhost:3001/api/stripe/products");
     const data: Product[] = await response.json();
     setProducts(data);
     localStorage.setItem("products", JSON.stringify(data));
   };

   const localProducts = localStorage.getItem("products");
   if (localProducts) {
     setProducts(JSON.parse(localProducts));
   } else {
     fetchProducts();
   }
 }, []);

  // const handleAddProduct = async (default_price: string) => {
  //   // const response = await fetch("http://localhost:3001/api/stripe/cart", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json"
  //   //   },
  //   //   body: JSON.stringify({ id })
  //   // });
  //   // const data = await response.json();

  //   // console.log(data);
  //   console.log(default_price);
  // };



  return <div>
      <h1>Products</h1>
      <section>
        {products.map(product => <article key={product.id}>
            <h3>
              {product.name}
            </h3>
            <p>
              {product.description}
            </p>
            <img src={product.images[0]} alt={product.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            <h4>
              {product.default_price.unit_amount / 100} {product.default_price.currency}
            </h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </article>)}
      </section>
    </div>;
};

export default Products;
