import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Error from "./components/Error";
import AppLayout from "./routes/AppLayout";
import Loader from "./components/Loader";

// Loaders
import { loader as queryLoader } from "./pages/SearchResults";
import { loader as categoriesLoader } from "./pages/CategoriesPage";
import { loader as categryLoader } from "./pages/CategoryPage";
import { loader as idLoader } from "./pages/ProductPageDetails";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "./featuers/auth/loginSlice";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./featuers/auth/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogOutPage = lazy(() => import("./pages/LogOutPage"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AllProductsPage = lazy(() => import("./pages/AllProductsPage"));
const ProductPageDetails = lazy(() => import("./pages/ProductPageDetails"));
const CartPage = lazy(() => import("./featuers/cart/CartPage"));
const WishListPage = lazy(() => import("./featuers/wishlist/WishListPage"));
const About = lazy(() => import("./pages/About"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signuppage", element: <SignupPage /> },
      { path: "/loginpage", element: <LoginPage /> },
      { path: "/logoutpage", element: <LogOutPage /> },
      {
        path: "/searchresults/:query",
        element: <SearchResults />,
        loader: queryLoader,
      },
      {
        path: "/categoriespage",
        element: <CategoriesPage />,
        loader: categoriesLoader,
      },
      {
        path: "/categoryPage/:category",
        element: <CategoryPage />,
        loader: categryLoader,
      },
      { path: "/allproductspage", element: <AllProductsPage /> },
      {
        path: "/productpagedetials/:id",
        element: <ProductPageDetails />,
        loader: idLoader,
      },
      { path: "/cartpage", element: <CartPage /> },
      { path: "/wishlist", element: <WishListPage /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuth");

    if (user && isAuth === true) {
      dispatch(setUserFromStorage(JSON.parse(user)));
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
