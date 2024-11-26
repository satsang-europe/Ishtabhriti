import { HandHeart, Loader, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDonationStore } from "../store/donationStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51Q1trI2Mb5kwBTVTvOZ11uk9pOFaQehfpMTKWodEH6SZBVGPZpPjPkvC2Tkp41KsYbrmTttuR3MzrFIGT3xClXxP00t7Qu62WR"
);

const DonationConfirmation = () => {
  const location = useLocation();
  const transactionDetails = location.state;
  // const { makeDonation, transaction, isSuccess, isLoading, error } =
  //   useDonationStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const stripe = await stripePromise;
      const res = await axios.post(
        "http://localhost:4500/donation/create-checkout-session",
        {
          donationCode: transactionDetails.donationCode,
          donationAmount: transactionDetails.donationAmount,
          donationCurrency: transactionDetails.donationCurrency,
          donorName: transactionDetails.member,
          familyCode: transactionDetails.familyCode,
        }
      );
      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error("Error:", result.error);
      }
      console.log(session);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-center text-gray-200 pt-16 md:pt-24 font-bold text-2xl md:text-3xl">
        Confirm Donation
      </h3>
      <form
        className="w-11/12 mx-auto md:w-1/3 mt-2 md:mt-4 border-2 border-solid p-2 md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="utsavcode relative mb-3 md:mb-3 flex justify-between">
          <div className="text-gray-200 font-bold">Utsav Code:</div>
          <div className="text-gray-200">{transactionDetails.donationCode}</div>
        </div>
        <div className="amount relative mb-3 md:mb-3 flex justify-between">
          <div className="text-gray-200 font-bold">Total:</div>
          <div className="text-gray-200">
            {transactionDetails.donationAmount}{" "}
            {transactionDetails.donationCurrency}
          </div>
        </div>
        <div className="amount relative mb-3 md:mb-3 flex justify-between">
          <div className="text-gray-200 font-bold">Donor:</div>
          <div className="text-gray-200">{transactionDetails.member}</div>
        </div>
        {/* {error && <p className="text-red-500 font-semibold mt-2">{error}</p>} */}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
        >
          CONFIRM
          {/* {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "CONFIRM"
          )} */}
        </button>
      </form>
    </>
  );
};
export default DonationConfirmation;
