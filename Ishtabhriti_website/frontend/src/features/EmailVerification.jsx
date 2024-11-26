import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleVerify = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleVerify(new Event("submit"));
    }
  }, [code]);

  return (
    <section
      className="w-full flex flex-col items-center md:mt-4 bg-slate-600 bg-opacity-50
    px-5 py-2 shadow-lg rounded-lg md:py-10"
    >
      <h3 className="text-gray-200 text-xl md:text-2xl font-bold md:font-extrabold">
        Verify Email
      </h3>
      <p className="text-center text-gray-300 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>
      <form onSubmit={handleVerify}>
        <div className="flex justify-between gap-2 md:gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-8 h-8 text-center md:w-10 md:h-10 font-bold bg-slate-700 text-white border-2 border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
            />
          ))}
        </div>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
        >
          {isLoading ? "Verifying..." : "SUBMIT"}
        </button>
      </form>
      <div className="px-8 py-4 flex justify-center">
        <p className="text-gray-200">
          Want to resend the verification code?{" "}
          <Link to={"/resend-code"} className="text-blue-400 hover:underline">
            Resend
          </Link>
        </p>
      </div>
    </section>
  );
};
export default EmailVerification;
