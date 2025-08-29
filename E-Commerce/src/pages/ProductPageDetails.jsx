import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { priceAfterDiscount } from "../utils/price";
import {
  addToWishlist,
  removeFromWishlist,
} from "../featuers/wishlist/wishlistSlice";
import { addToCart, removeFromCart } from "../featuers/cart/cartSlice";
import { useGetProductByIDQuery } from "../services/apiServices";

import ImageSlide from "../components/ImageSlide";
import StarRating from "../components/StarRating";
import Button from "../components/Button";
import SpinnerFullPage from "../components/SpinnerFullPage";
import Error from "../components/Error";

function ProductPageDetails() {
  const { id } = useParams();
  const { data: productDetials, error, isLoading } = useGetProductByIDQuery(id);
  console.log(productDetials);

  const wishlistIds = useSelector((store) => store.wishlist.wishlistIds);
  const cartProductIds = useSelector((store) => store.cart.cartProducts);
  const { isAuth } = useSelector((store) => store.login);

  useEffect(() => {
    if (!isAuth) setLiked(false);
  }, [isAuth]);

  const [liked, setLiked] = useState(wishlistIds.includes(productDetials?.id));
  const [incart, setInCart] = useState(
    cartProductIds.includes(productDetials?.id)
  );

  const dispatch = useDispatch();

  function handelLiked(e) {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    newLiked
      ? dispatch(addToWishlist(productDetials.id))
      : dispatch(removeFromWishlist(productDetials.id));
  }

  function handelInCart(e) {
    e.stopPropagation();
    const newInCart = !incart;
    setInCart(newInCart);
    newInCart
      ? dispatch(addToCart(productDetials.id))
      : dispatch(removeFromCart(productDetials.id));
  }

  if (isLoading) return <SpinnerFullPage />;

  if (error) return <Error>{error}</Error>;

  return (
    <section className="layout py-7 flex flex-col md:flex-row items-start justify-between gap-8">
      <ImageSlide images={productDetials.images} title={productDetials.title} />

      <div className="flex flex-col gap-4 w-full lg:w-auto my-auto">
        <p className="text-sm text-[#C2C2D3] uppercase">
          {productDetials.category}
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#202435]">
          {productDetials.title}
        </h1>

        {productDetials.discountPercentage && (
          <p className="px-2 py-1 bg-[#35AFA0] text-white text-base w-max rounded-md">
            {productDetials.discountPercentage}%
          </p>
        )}

        {productDetials.discountPercentage ? (
          <div className="flex items-center gap-4">
            <p className="text-sm sm:text-base text-[#C2C2D3] line-through">
              {productDetials.price}$
            </p>
            <p className="text-lg sm:text-xl text-[#D51243] font-semibold">
              {priceAfterDiscount(
                productDetials.price,
                productDetials.discountPercentage
              )}
              $
            </p>
          </div>
        ) : (
          <p className="text-lg sm:text-xl font-semibold">
            {productDetials.price}$
          </p>
        )}

        <p
          className={`text-sm sm:text-base ${productDetials.stock ? "text-[#00B853]" : "text-[#D51243]"}`}
        >
          {productDetials.stock ? "In Stock" : "Out of Stock"}
        </p>

        <div className="flex items-center gap-2">
          <StarRating defaultRating={productDetials.rating} size={24} />
          <p className="text-[#71778E]">{productDetials.rating}</p>
        </div>

        <p className="text-base text-[#4F5466]">{productDetials.description}</p>

        <div className="flex items-center gap-6 pt-2">
          <svg
            onClick={(e) => handelLiked(e)}
            xmlns="http://www.w3.org/2000/svg"
            fill={liked && isAuth ? "#D51243" : "none"}
            viewBox="0 0 24 24"
            stroke={liked && isAuth ? "#D51243" : "currentColor"}
            strokeWidth={1.8}
            className="w-6 h-6 cursor-pointer transition-all duration-300 hover:scale-110 hover:stroke-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
            C13.09 3.81 14.76 3 16.5 3 
            19.58 3 22 5.42 22 8.5 
            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>

          <Button buttonFunc={(e) => handelInCart(e)}>
            {incart && isAuth ? (
              <i className="fa-solid fa-circle-minus"></i>
            ) : (
              <i className="fa-solid fa-cart-plus hover:rotate-12 hover:scale-110 hover:text-white transition-transform duration-300"></i>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductPageDetails;
