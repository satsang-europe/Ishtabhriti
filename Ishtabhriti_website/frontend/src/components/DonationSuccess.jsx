import axios from "../lib/axios";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DonationSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  let isApiCalled = false;
  const handleCheckoutSuccess = async (sessionId) => {
    try {
      if (!isApiCalled) {
        await axios.post("/checkout-success", {
          sessionId,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
      isApiCalled = true;
    }
  };

  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  useEffect(() => {
    if (sessionId) {
      return () => {
        handleCheckoutSuccess(sessionId);
      };
    } else {
      return () => {
        setIsProcessing(false);
        setError("No session ID found in the URL");
      };
    }
  }, [sessionId]);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Payment Successful!
          </h1>

          <p className="text-gray-300 text-center mb-2">
            Thank you for your donation. {"We're"} processing it now.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email for donation details and updates.
          </p>
          {/* <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Donation Code</span>
              <span className="text-sm font-semibold text-emerald-400">
                #1234
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Donation Amount</span>
              <span className="text-sm font-semibold text-emerald-400">
                3-5 business days
              </span>
            </div>
          </div> */}

          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for your contribution! JOYGURU🙏🏼
            </button>
            <Link
              to={"/home"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Go to home page
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DonationSuccess;
