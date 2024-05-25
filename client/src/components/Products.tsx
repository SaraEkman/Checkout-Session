import { useEffect, useState } from "react";
import { useCart } from "../context/CardContext";
import { Product } from "../modules/Types";
import "../styles/Products.css";

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

  return < >
    <section className="products-container">
      {products.map(product =>
        <article key={product.id} className="product-article">
          <img src={product.images[0]} alt={product.name} />
          <div className="product-info">
            <h3>
              {product.name}
            </h3>
            <p>
              {product.description}
            </p>
            <h4>
              {(product.default_price.unit_amount / 100).toFixed(2)}{" "}
              {product.default_price.currency}
            </h4>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              Lägga till
            </button>
          </div>
        </article>
      )}
    </section>
  </>;
};

export default Products;
