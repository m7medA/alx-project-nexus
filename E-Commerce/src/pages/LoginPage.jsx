import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authUser } from "../featuers/auth/loginSlice";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { isAuth, error, status } = useSelector((store) => store.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onSubmit(data) {
    dispatch(authUser(data));

    reset();
  }

  useEffect(() => {
    if (isAuth === true) navigate("/");
  }, [isAuth, navigate]);

  return (
    <section className="layout py-6">
      <form
        className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-lg text-[#3E445A]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className={`text-sm font-medium ${errors.email ? "text-red-600" : "text-[#71778E]"}`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "This field is required !" })}
            className={`bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 ${errors.email ? "focus:ring-red-600" : "focus:ring-[#35AFA0]"} transition-all duration-300 shadow-sm`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <span className="text-xs font-bold w-max px-2 py-1 text-red-600 bg-red-100 rounded-md ">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className={`text-sm font-medium ${errors.password ? "text-red-600" : "text-[#71778E]"}`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "This field is required !" })}
            className={`bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 ${errors.password ? "focus:ring-red-600" : "focus:ring-[#35AFA0]"} transition-all duration-300 shadow-sm`}
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="text-xs font-bold w-max px-2 py-1 text-red-600 bg-red-100 rounded-md ">
              {errors.password.message}
            </span>
          )}
        </div>

        {error && (
          <div className="mx-auto flex w-max items-start gap-3 bg-red-50 text-red-800 px-3 py-2 rounded-lg shadow-md animate-fade-in">
            <svg
              className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 6zm0 7a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="relative h-8">
          <NavLink
            to="/signuppage"
            className={`absolute right-0 text-[#35AFA0] font-semibold px-2 py-1 rounded-md hover:text-white hover:bg-[#35AFA0] transition-all duration-300 w-max ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            sign up
          </NavLink>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`bg-[#35AFA0] text-white font-semibold py-2 rounded-md hover:bg-[#35AFA0] transition-colors duration-300 ${status === "loading" ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
