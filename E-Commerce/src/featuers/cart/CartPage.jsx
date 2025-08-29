import { useSelector } from "react-redux";
import { useGetProductByIDsQuery } from "../../services/apiServices";

import ProductContianer from "../products/ProductContianer";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

function CartPage() {
  const cartProducts = useSelector((store) => store.cart.cartProducts);
  const { isAuth } = useSelector((store) => store.login);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductByIDsQuery(cartProducts);

  if (isLoading) return <Spinner />;

  if (error) return <Error>{error}</Error>;

  return (
    <section className="layout py-6">
      {isAuth ? (
        <>
          <h1 className="mb-12 text-4xl font-semibold tracking-widest text-[#35AFA0]">
            Your Cart
          </h1>
          {products.length === 0 ? (
            <p className="text-center text-[#3E445A] mt-10 text-3xl">
              Your cart is empty 💔
            </p>
          ) : (
            <>{products && <ProductContianer products={products} />}</>
          )}
        </>
      ) : (
        <>
          <h1 className="mb-12 text-4xl font-semibold tracking-widest text-[#35AFA0]">
            Add to your cart
          </h1>
          <p className="text-center text-[#3E445A] mt-10 text-3xl">
            Login to add items to your cart and access them anytime!
          </p>
        </>
      )}
    </section>
  );
}

export default CartPage;
