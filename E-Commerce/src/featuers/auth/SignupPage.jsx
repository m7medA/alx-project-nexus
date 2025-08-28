import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./signinSlice";
import { useNavigate } from "react-router-dom";
import { setUserFromStorage } from "./loginSlice";
import { useForm } from "react-hook-form";

function SignupPage() {
  const { user, status } = useSelector((store) => store.signin);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    dispatch(addUser(data));

    dispatch(setUserFromStorage(user));

    reset();

    navigate("/");
  }

  return (
    <section className="layout py-6">
      <form
        className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-lg text-[#3E445A]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center">Sign in Form</h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className={`text-sm font-medium ${errors.name ? "text-red-600" : "text-[#71778E]"}`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "This field is required !" })}
            className={`bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 ${errors.name ? "focus:ring-red-600" : "focus:ring-[#35AFA0]"} transition-all duration-300 shadow-sm`}
            placeholder="Mohamed Ayman"
          />
          {errors.name && (
            <span className="text-xs font-bold w-max px-2 py-1 text-red-600 bg-red-100 rounded-md ">
              {errors.name.message}
            </span>
          )}
        </div>

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
            {...register("password", {
              required: "This field is required !",
              minLength: {
                value: 8,
                message: "🔒 Password must be at least 8 characters long.",
              },
            })}
            className={`bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 ${errors.password ? "focus:ring-red-600" : "focus:ring-[#35AFA0]"} transition-all duration-300 shadow-sm`}
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="text-xs font-bold w-max px-2 py-1 text-red-600 bg-red-100 rounded-md ">
              {errors.password.message}
            </span>
          )}
        </div>

        {/*Gender*/}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[#71778E]">Gender</p>

          <div className="flex flex-row gap-6 items-center">
            <div className="flex gap-2 items-center justify-center p-2">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                {...register("gender", { required: true })}
                className="rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 cursor-pointer"
              />
              <label
                htmlFor="male"
                className="text-sm font-medium text-[#71778E]"
              >
                male
              </label>
            </div>

            <div className="flex gap-2 items-center justify-center p-2">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                {...register("gender", { required: true })}
                className="rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 cursor-pointer"
              />
              <label
                htmlFor="female"
                className="text-sm font-medium text-[#71778E]"
              >
                female
              </label>
            </div>
            {errors.gender && (
              <span className="text-xs font-bold w-max px-2 py-1 text-red-600 bg-red-100 rounded-md ">
                Please select your gender !
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#35AFA0] text-white font-semibold py-2 rounded-md hover:bg-[#35AFA0] transition-colors duration-300 cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </section>
  );
}

export default SignupPage;
