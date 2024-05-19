import React, { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  default_price: {
    currency: string;
    unit_amount: number;
  };
}

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/api/stripe/products");
      const data = await response.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data));
      console.log(data);
    };
    if (localStorage.getItem("products") !== null) {
      setProducts(JSON.parse(localStorage.getItem("products") || "{}"));
    } else {
      fetchProducts();
    }
  }, []);

  const handleAddProduct = async (default_price: string) => {
    // const response = await fetch("http://localhost:3000/api/stripe/cart", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ id })
    // });
    // const data = await response.json();

    // console.log(data);
    console.log(default_price);
  };

  const ProductItem: React.FC<Product> = ({
    id,
    name,
    description,
    images,
    default_price
  }) => {
    return (
      <article key={id}>
        <h3>
          {name}
        </h3>
        <p>
          {description}
        </p>
        <img
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            listStyle: "none"
          }}
          src={images[0]}
          alt={name}
        />
        <h4>
          {default_price.unit_amount / 100} {default_price.currency}
        </h4>
        <button
          onClick={() => {
            handleAddProduct(
              default_price.currency + default_price.unit_amount / 100
            );
          }}
        >
          Lägga till
        </button>
      </article>
    );
  };

  return (
    <div>
      <h1>Products</h1>
      <section>
        {products.map(product => <ProductItem key={product.id} {...product} />)}
      </section>
    </div>
  );
};

export default Products;
