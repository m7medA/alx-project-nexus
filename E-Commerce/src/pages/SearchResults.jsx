import { useParams } from "react-router-dom";
import { useGetBySearchQuery } from "../services/apiServices";

import ProductContianer from "../featuers/products/ProductContianer";
import SpinnerFullPage from "../components/SpinnerFullPage";

function SearchResults() {
  const { query } = useParams();

  const { data, isLoading } = useGetBySearchQuery(query);

  const products = data?.products;

  if (isLoading) return <SpinnerFullPage />;

  if (products)
    return (
      <div className="w-[90%] mx-auto p-6">
        {products.length > 0 ? (
          <>
            <h1 className="text-xl font-semibold tracking-widest text-[#3E445A] mb-6">
              Found {products.length} results for:{" "}
              <span className="text-main text-[#35AFA0]">"{query}"</span>{" "}
            </h1>
            <ProductContianer products={products} />
          </>
        ) : (
          <h1 className="text-xl font-semibold tracking-widest text-center text-[#3E445A] mb-6">
            No results found about{" "}
            <span className="text-main text-[#35AFA0]">"{query}"</span> . Try a
            different keyword 🔍
          </h1>
        )}
      </div>
    );
}

export default SearchResults;
