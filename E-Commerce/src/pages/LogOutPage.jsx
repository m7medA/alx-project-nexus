import { useDispatch, useSelector } from "react-redux";
import { logout } from "../featuers/auth/loginSlice";
import { useNavigate } from "react-router-dom";

function LogOutPage() {
  const { isAuth, user } = useSelector((store) => store.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handelLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <section>
      <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl text-lg text-[#3E445A]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#35AFA0] mb-2">
            👋 Welcome back,
          </h2>
          <p className="text-xl font-semibold text-gray-800 capitalize">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            You are successfully logged in 🎉
          </p>
        </div>

        <button
          onClick={handelLogout}
          className="w-full bg-[#35AFA0] text-white font-semibold py-2 rounded-md hover:bg-[#2e9b8d] transition duration-300 shadow-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default LogOutPage;
