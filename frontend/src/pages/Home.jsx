import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/toys")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)));
  }, []);

  if (!products.length) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-8xl mx-auto px-6 md:px-12 py-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        Welcome to Toy Store 🧸
      </h1>

      {/* Featured Slider */}
     {/* Home.jsx: Featured Slider */}
<div className="overflow-hidden pb-[8%]">
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    spaceBetween={24}
    slidesPerView={1}
    loop={true}
    autoplay={{ delay: 3000 }}
    pagination={{ clickable: true }}
    navigation
    breakpoints={{
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 32 },
    }}
  >
    {products.map((product) => (
      <SwiperSlide key={product._id}>
        <div className="p-4 pb-[9%]">
          <div className="overflow-hidden rounded-lg">
            {/* Hover efekt: podizanje i shadow */}
            <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg p-1">
              <ProductCard product={product} />
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      {/* View All Button */}
      <div className="mt-12 text-center">
        <Link
          to="/products"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home;