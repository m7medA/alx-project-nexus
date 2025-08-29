import CtegoryNavLink from "../components/CtegoryNavLink";
import { useGetAllCategoriesQuery } from "../services/apiServices";
import Spinner from "../components/Spinner";

function CategoriesPage() {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) return <Spinner />;

  return (
    <section className="layout py-6 text-sm sm:text-base">
      <ul className="flex items-center justify-items-start flex-wrap">
        {categories?.map((category) => (
          <CtegoryNavLink
            key={category.slug}
            to={`/categoryPage/${category.slug.trim().toLowerCase()}`}
            type="category"
          >
            {category.name}
          </CtegoryNavLink>
        ))}
      </ul>
    </section>
  );
}

export default CategoriesPage;
