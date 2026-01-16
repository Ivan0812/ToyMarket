import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/toys/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const handleAdd = () => {
    setLoading(true);
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: Array.isArray(product.images) ? product.images[0] : product.image,
      quantity: 1,
      stock: product.quantity,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => {
      setLoading(false);
      setAdded(false);
    }, 1000);
  };

  // Ovo osigurava da Swiper uvijek ima array slika
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl font-semibold mb-4">{product.price} €</p>
      <p className="mb-6">{product.description}</p>

      {/* Carousel za sve slike proizvoda */}
      {images.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mb-6"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-96 object-contain rounded border"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <button
        onClick={handleAdd}
        disabled={product.quantity === 0 || loading || added}
        className={`px-6 py-2 rounded text-white transition-all duration-300 ${
          product.quantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : added
            ? "bg-green-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {product.quantity === 0
          ? "Sold Out"
          : added
          ? "Added ✓"
          : loading
          ? "Adding..."
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetail;