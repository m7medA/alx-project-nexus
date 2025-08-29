import { useSelector } from "react-redux";
import { useGetProductByIDsQuery } from "../../services/apiServices";

import ProductContianer from "../products/ProductContianer";
import Message from "../../components/Message";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";

function WishList() {
  const wishlistIds = useSelector((store) => store.wishlist.wishlistIds);
  const { isAuth } = useSelector((store) => store.login);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductByIDsQuery(wishlistIds);

  if (isLoading) return <Spinner />;

  if (error) return <Error>{error}</Error>;

  return (
    <section className="layout py-6">
      {isAuth ? (
        <>
          <h1 className="mb-12 text-4xl font-semibold tracking-widest text-[#35AFA0]">
            Your wish List
          </h1>
          <Message>Your wishlist is empty 💔</Message>
          {products && <ProductContianer products={products} />}{" "}
        </>
      ) : (
        <>
          <h1 className="mb-12 text-4xl font-semibold tracking-widest text-[#35AFA0]">
            Save Your Favorites
          </h1>
          <p className="text-center text-[#3E445A] mt-10 text-3xl">
            Login to save items to your wishlist and access them anytime!
          </p>
        </>
      )}
    </section>
  );
}

export default WishList;
