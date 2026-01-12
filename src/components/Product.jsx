import { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReplayIcon from "@mui/icons-material/Replay";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = () => {
    const current = Number(localStorage.getItem("cartCount")) || 0;
    localStorage.setItem("cartCount", current + qty);
    window.dispatchEvent(new Event("cartUpdate"));
    setProduct(null);
    setQty(1);
  };

  return (
    <>
      <section className="bg-gray-100 py-6 px-4">
        <h2 className="text-xl font-semibold mb-4">Flash Sale</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map(p => (
            <div
              key={p.id}
              onClick={() => setProduct(p)}
              className="bg-white p-2 rounded cursor-pointer hover:shadow"
            >
              <img src={p.image} className="h-36 w-full object-contain" />
              <p className="text-xs mt-2 line-clamp-2">{p.title}</p>
              <p className="text-orange-500 font-semibold">
                Rs. {(p.price * 280).toFixed(0)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {product && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-auto">
          <div className="bg-white max-w-[1200px] mx-auto mt-10 p-6 relative">
            <button
              onClick={() => setProduct(null)}
              className="absolute top-4 right-6"
            >
              <CancelIcon fontSize="large" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <img
                  src={product.image}
                  className="w-full h-[350px] object-contain border"
                />

                <div className="flex gap-2 mt-3">
                  <img src={product.image} className="h-16 w-16 border p-1" />
                  <img src={product.image} className="h-16 w-16 border p-1" />
                  <img src={product.image} className="h-16 w-16 border p-1" />
                </div>
              </div>

              <div>
                <h1 className="text-lg font-semibold mb-2">
                  {product.title}
                </h1>

                <div className="flex items-center gap-1 text-orange-500 mb-3">
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <span className="text-sm text-blue-600 ml-2">
                    Ratings 1238
                  </span>
                </div>

                <p className="text-orange-600 text-2xl font-bold">
                  Rs. {(product.price * 280).toFixed(0)}
                </p>

                <p className="line-through text-gray-400 text-sm">
                  Rs. {(product.price * 350).toFixed(0)}
                </p>

                <p className="text-green-600 text-sm mb-4">-71%</p>

                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => qty > 1 && setQty(qty - 1)}
                      className="border px-3 py-1"
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  className="bg-[#f85606] text-white px-10 py-3 text-lg rounded"
                >
                  Add to Cart
                </button>
              </div>

              <div className="border p-4 text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <LocationOnIcon fontSize="small" />
                  <span>Sindh, Karachi</span>
                </div>

                <div className="flex items-center gap-2">
                  <LocalShippingIcon fontSize="small" />
                  <span>Standard Delivery Rs. 130</span>
                </div>

                <div className="flex items-center gap-2">
                  <ReplayIcon fontSize="small" />
                  <span>14 days easy return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
