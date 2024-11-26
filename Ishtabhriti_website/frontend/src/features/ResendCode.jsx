import { useState } from "react";
import Input from "../utils/Input";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResendCode = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { error, isLoading, resendVerificationEmailCode } = useAuthStore();
  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await resendVerificationEmailCode(email);
      navigate("/verify-email");
      toast.success("Sent the verification code");
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
        Provide Email and resend verification code
      </h3>
      <form
        className="w-full mt-2 md:mt-8 border-2 border-solid p-2 md:p-8"
        onSubmit={handleResend}
      >
        <Input
          icon={Mail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
        >
          {isLoading ? "Verifying..." : "SEND"}
        </button>
      </form>
    </section>
  );
};
export default ResendCode;
