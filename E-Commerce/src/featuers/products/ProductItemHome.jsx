import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { addToCart, removeFromCart, updateUserCart } from "../cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  updateUserWishlist,
} from "../../featuers/wishlist/wishlistSlice";
import StarRating from "../../components/StarRating";
import Button from "../../components/Button";
import { priceAfterDiscount } from "../../utils/price";
import { useNavigate } from "react-router-dom";

function ProductItem({ product, loved }) {
  const [liked, setLiked] = useState(loved);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((store) => store.cart.cartProducts);
  const wishlistIds = useSelector((store) => store.wishlist.wishlistIds);
  const { isAuth, user } = useSelector((store) => store.login);

  useEffect(() => {
    if (!isAuth) setLiked(false);
  }, [isAuth]);

  const incart = cartProducts.includes(product.id);

  const handelLiked = useCallback(
    (e) => {
      e.stopPropagation();
      setLiked((prev) => {
        const newLiked = !prev;
        let updateWishlist;

        if (newLiked) {
          dispatch(addToWishlist(product.id));
          updateWishlist = [...wishlistIds, product.id];
        } else {
          dispatch(removeFromWishlist(product.id));
          updateWishlist = wishlistIds.filter((id) => id !== product.id);
        }

        if (user?.id) {
          dispatch(
            updateUserWishlist({
              id: user.id,
              wishlist: updateWishlist,
            })
          );
        }

        return newLiked;
      });
    },
    [dispatch, product.id, user?.id, wishlistIds]
  );

  const handelInCart = useCallback(
    (e) => {
      e.stopPropagation();

      let updatedCart;
      if (!incart) {
        dispatch(addToCart(product.id));
        updatedCart = [...cartProducts, product.id];
      } else {
        dispatch(removeFromCart(product.id));
        updatedCart = cartProducts.filter((id) => id !== product.id);
      }

      if (user?.id) {
        dispatch(
          updateUserCart({
            id: user.id,
            cart: updatedCart,
          })
        );
      }
    },
    [dispatch, product.id, user?.id, cartProducts, incart]
  );

  const navigateToProduct = useCallback(() => {
    navigate(`/productpagedetials/${product.id}`);
  }, [navigate, product.id]);

  return (
    <li
      className="border-2 border-[#EDEEF5] text-left flex flex-col gap-2 rounded-md w-[90%] md:w-auto h-[400px] cursor-pointer group"
      onClick={navigateToProduct}
    >
      {/* Product image and discount badge */}
      <div className="w-3xs p-4 mx-auto relative">
        {product.discountPercentage && (
          <p className="absolute left-0 px-2 py-1 bg-[#35AFA0] rounded-md text-white text-lg">
            {product.discountPercentage}%
          </p>
        )}
        <div className="flex items-center flex-col">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-38 sm:w-36 transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product details */}
      <div className="px-4">
        <h3 className="min-h-[56px] font-semibold text-sm sm:text-base md:text-lg text-[#202435]">
          {product.title}
        </h3>

        <p
          className={`text-left py-1 ${
            product.stock ? "text-[#00B853]" : "text-[#D51243]"
          } text-sm sm:text-base md:text-lg pb-3`}
        >
          {product.stock ? "in stock" : "out stock"}
        </p>

        <StarRating defaultRating={product.rating} size={18} />

        {/* Price display */}
        {product.discountPercentage ? (
          <div className="flex items-center gap-2 justify-between w-[70%] sm:w-[50%] lg:w-[35%] py-2">
            <p className="text-sm sm:text-base text-[#C2C2D3] line-through">
              ${product.price}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#D51243]">
              ${priceAfterDiscount(product.price, product.discountPercentage)}
            </p>
          </div>
        ) : (
          <p className="text-base sm:text-lg md:text-xl">${product.price}</p>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handelLiked}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="p-1"
          >
            <svg
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
          </button>

          <Button
            buttonFunc={isAuth && handelInCart}
            aria-label={incart && isAuth ? "Remove from cart" : "Add to cart"}
          >
            {incart ? (
              <i className="fa-solid fa-circle-minus"></i>
            ) : (
              <i className="fa-solid fa-cart-plus hover:rotate-12 hover:scale-110 hover:text-white transition-transform duration-300"></i>
            )}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
