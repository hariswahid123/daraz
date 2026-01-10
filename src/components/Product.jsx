import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = () => {
    const count = Number(localStorage.getItem("cartCount")) || 0;
    localStorage.setItem("cartCount", count + 1);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  return (
    <>
      <section className="bg-gray-100 py-6 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white p-2 rounded hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-contain"
              />

              <p className="text-xs mt-2 line-clamp-2">
                {product.title}
              </p>

              <p className="text-orange-500 font-semibold mt-1">
                Rs. {(product.price * 280).toFixed(0)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[700px] rounded p-5 relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-3 top-3 text-xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedProduct.image}
                alt=""
                className="w-full h-64 object-contain"
              />

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {selectedProduct.title}
                </h3>

                <p className="text-orange-500 text-xl font-bold mb-3">
                  Rs. {(selectedProduct.price * 280).toFixed(0)}
                </p>

                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {selectedProduct.description}
                </p>

                <button
                  onClick={addToCart}
                  className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Products;
