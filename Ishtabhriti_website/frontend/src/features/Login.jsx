import { useState } from "react";
import Input from "../utils/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (email === "admin_europe@satsangeurope.org") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      className="w-full flex flex-col items-center md:mt-4 bg-slate-600 bg-opacity-50
    px-5 py-2 shadow-lg rounded-lg"
    >
      <h3 className="text-gray-200 text-xl md:text-2xl font-bold md:font-extrabold">
        Login
      </h3>
      <form
        className="w-full mt-2 md:mt-8 border-2 border-solid p-2 md:p-8"
        onSubmit={handleLogin}
      >
        <Input
          icon={Mail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "SIGN In"
          )}
        </button>
      </form>
      <div className="px-8 py-4 flex justify-center">
        <p className="text-gray-200">
          Do not have an account?{" "}
          <Link to={"/register"} className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
      <div className="px-8 py-4 flex justify-center">
        <p className="text-gray-200">
          Forgot Password?{" "}
          <Link
            to={"/forgot-password"}
            className="text-blue-400 hover:underline"
          >
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Login;
