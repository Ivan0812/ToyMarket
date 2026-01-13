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
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 6)));
  }, []);

  if (!products.length) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-8xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Toy Store 🧸</h1>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        
      >
        {products.map(product => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-2 rounded"
        >
          View all products
        </Link>
      </div>
    </div>
  );
};

export default Home;