import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function UserInfo() {
  const { isAuth, user } = useSelector((store) => store.login);
  const cartProducts = useSelector((store) => store.cart.cartProducts);

  const cartLength = cartProducts?.length || 0;
  const credit = user?.credit || "0";

  return (
    <div className="flex items-center gap-4 md:gap-4 lg:gap-8 order-1 md:order-2 w-auto">
      <NavLink
        to={`${isAuth ? "/logoutpage" : "/loginpage"}`}
        className="relative cursor-pointer"
      >
        {isAuth ? (
          <img
            src="https://i.pravatar.cc/100?u=zz"
            alt="profile"
            className="w-12 rounded-full"
          />
        ) : (
          <i className="fa-solid fa-user text-base md:text-xl text-color border border-[#E2E4EC] px-3.5 py-3 rounded-full" />
        )}
      </NavLink>

      <p className="text-base md:text-xl text-color font-bold">
        {isAuth ? `${credit}.00$` : "0.00"}
      </p>

      <NavLink to="/cartpage" className="relative cursor-pointer">
        <i className="fa-solid fa-bag-shopping text-base md:text-xl text-[#EA2B0F] bg-[#FFF1EE] px-3.5 py-3 rounded-full" />
        <span className="absolute -top-1 -right-1 bg-[#EA2B0F] text-white w-5 h-5 flex items-center justify-center text-xs rounded-full font-bold">
          {isAuth ? cartLength : 0}
        </span>
      </NavLink>
    </div>
  );
}

export default UserInfo;
