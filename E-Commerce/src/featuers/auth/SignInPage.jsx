import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./signinSlice";
import { useNavigate } from "react-router-dom";
import { setUserFromStorage } from "./loginSlice";

function SigninPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const { user, status } = useSelector((store) => store.signin);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handelSubmit(e) {
    e.preventDefault();
    if (!email || !password || !gender || !name) return;

    dispatch(addUser({ name, email, password, gender }));

    dispatch(setUserFromStorage(user));

    navigate("/");

    setName("");
    setEmail("");
    setPassword("");
    setGender("");
  }

  return (
    <section className="layout py-6">
      <form
        className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-lg text-[#3E445A]"
        onSubmit={(e) => handelSubmit(e)}
      >
        <h2 className="text-2xl font-bold text-center">Sign in Form</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[#71778E]">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 shadow-sm"
            placeholder="Mohamed Ayman"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[#71778E]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 shadow-sm"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#71778E]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-[#F3F9F7] rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 shadow-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
                className="rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 cursor-pointer"
                value="male"
                onChange={() => setGender("male")}
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
                className="rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#35AFA0] transition-all duration-300 cursor-pointer"
                value="female"
                onChange={() => setGender("female")}
              />
              <label
                htmlFor="female"
                className="text-sm font-medium text-[#71778E]"
              >
                female
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#35AFA0] text-white font-semibold py-2 rounded-md hover:bg-[#35AFA0] transition-colors duration-300 cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default SigninPage;
