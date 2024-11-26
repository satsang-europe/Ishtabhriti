import { useEffect, useState } from "react";
import { useDonationStore } from "../store/donationStore";
import { useMemberStore } from "../store/memberStore";
import { Banknote, Currency, HandHeart, Link, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;
let error = null;
const NormalDonation = () => {
  const { getDonationCodes, donations } = useDonationStore();
  //   const [arghya, setArghya] = useState("");
  const [arghyaCode, setArghyaCode] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [validAmount, setValidAmount] = useState(false);
  const [currency, setCurrency] = useState("");
  const { user } = useAuthStore();
  const { getMembers, members } = useMemberStore();
  const navigate = useNavigate();
  useEffect(() => {
    getMembers(user.familyCode);
    getDonationCodes();
  }, [getDonationCodes, getMembers, user]);

  useEffect(() => {
    setValidAmount(AMOUNT_REGEX.test(donationAmount));
  }, [donationAmount]);

  const onAmountChanged = (e) => setDonationAmount(e.target.value);

  const canSave = [
    validAmount,
    arghyaCode !== "",
    memberName !== "",
    currency !== "",
  ].every(Boolean);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (canSave) {
        const transactionDetails = {
          donationCode: arghyaCode,
          donationAmount,
          donationCurrency: currency,
          member: memberName,
          familyCode: user.familyCode,
        };
        navigate("/home/donation-confirmation", {
          state: transactionDetails,
        });
      } else {
        console.log("there is an issue");
        error = "Input is not correct";
      }
      console.log(memberName);
    } catch (error) {
      console.log(error);
    }
  };

  const content = members ? (
    <div className="status relative mb-3 md:mb-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <User className="size-5 text-gray-200"></User>
      </div>
      <select
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
        value={memberName}
        onChange={(e) => setMemberName(e.target.selectedOptions[0].text)}
        required
      >
        <option value="" disabled>
          Select Member
        </option>
        {members.map((x) => {
          if (!x.isDeleted) {
            return (
              <option key={x._id} value={x._id}>
                {x.firstName} {x.lastName}
              </option>
            );
          }
        })}
      </select>
    </div>
  ) : (
    "Loading"
  );

  return (
    <>
      <h3 className="text-center text-gray-200 pt-16 md:pt-24 font-bold text-2xl md:text-3xl">
        Donate
      </h3>
      <form
        className="w-11/12 mx-auto md:w-1/3 mt-2 md:mt-4 border-2 border-solid p-2 md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="status relative mb-3 md:mb-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HandHeart className="size-5 text-gray-200"></HandHeart>
          </div>
          {donations && (
            <select
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              value={arghyaCode}
              onChange={(e) => setArghyaCode(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Donation Purpose
              </option>
              {donations.map((x) => {
                return (
                  <option key={x.code} value={x.code}>
                    {x.desc}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="flex mb-6">
          <p className="text-gray-200 pl-3">Donation Code:</p>
          <p className="text-gray-200 pl-3">{arghyaCode}</p>
        </div>
        {content}
        <div className="flex flex-col md:flex-row md:justify-between md:gap-5">
          <div className="firstName relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Banknote className="size-5 text-gray-200"></Banknote>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              autoComplete="off"
              placeholder="Enter the amount"
              value={donationAmount}
              onChange={onAmountChanged}
              required
            />
          </div>

          <div className="currency relative mb-3 md:mb-6">
            <select
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Currency
              </option>
              <option value="eur">EURO</option>
              <option value="SEK">Swedish Kroner</option>
              <option value="NOK">Norwegian Kroner</option>
              <option value="DKK">Danish Kroner</option>
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </>
  );
};
export default NormalDonation;
