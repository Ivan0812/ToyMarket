import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/toys");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        setProducts(data);
        setFeatured(data.slice(0, 6)); // prvi 4 proizvoda kao featured
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">
      All Products
    </h1>
  
    {/* Carousel za featured proizvode */}
    {featured.length > 0 && (
      <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Featured Products</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {featured.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="p-4">
              {/* Dodaj posebni wrapper za featured */}
              <div className="bg-gradient-to-b from-white to-gray-50 border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <ProductCard product={product} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    )}
  
    {/* Grid za sve proizvode */}
    {products.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-10">No products available.</p>
    )}
  </div>
  );
};

export default Products;