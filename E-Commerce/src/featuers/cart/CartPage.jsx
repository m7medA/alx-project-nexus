import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchByIds } from "../../utils/fetches";
import ProductContianer from "../products/ProductContianer";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";

function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();

  const cartProducts = useSelector((store) => store.cart.cartProducts);
  const { isAuth } = useSelector((store) => store.login);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (cartProducts?.length > 0) {
        const data = await fetchByIds(cartProducts);
        setProducts(data);
      } else {
        setProducts([]);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [cartProducts]);

  return (
    <section className="layout py-6">
      {isAuth ? (
        isLoading ? (
          <Spinner />
        ) : (
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
        )
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
