import { useParams } from "react-router-dom";
import ProductContianer from "../featuers/products/ProductContianer";
import Spinner from "../components/Spinner";
import { useGetCategoryQuery } from "../services/apiServices";

function CategoryPage() {
  const { category } = useParams();
  const { data, isLoading } = useGetCategoryQuery(category);

  const products = data?.products;

  if (isLoading) return <Spinner />;

  if (products)
    return (
      <div className=" layout py-6">
        <h1 className="uppercase text-[#202435] text-center mb-6 font-semibold text-2xl sm:text-3xl py-1 sm:py-2">
          {category} section
        </h1>
        <ProductContianer products={products} />
      </div>
    );
}

export default CategoryPage;
