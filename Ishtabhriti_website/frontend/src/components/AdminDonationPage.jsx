import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Loader, CoinsIcon, TextIcon } from "lucide-react";
import { useDonationStore } from "../store/donationStore";
import DonationList from "../features/DonationList";

const AdminDonationPage = () => {
  const [donationCode, setDonationCode] = useState("");
  const [donationDesc, setDonationDesc] = useState("");
  const { getDonationCodes, createDonation, donations, isLoading, error } =
    useDonationStore();
  useEffect(() => {
    getDonationCodes();
  }, [getDonationCodes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      confirmAlert({
        title: "Want to add the donation code?",
        message: `Want to add ${donationCode}? Click Yes to add.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await createDonation(donationCode, donationDesc);
              await getDonationCodes();
              setDonationCode("");
              setDonationDesc("");
            },
          },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-center text-gray-200 pt-24 font-bold">
        Add Donation Code
      </h3>
      <form
        className="w-11/12 mx-auto md:w-1/2 mt-2 md:mt-8 border-2 border-solid p-2 md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:gap-5">
          <div className="donationCode relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CoinsIcon className="size-5 text-gray-200"></CoinsIcon>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="Donation Code"
              value={donationCode}
              onChange={(e) => setDonationCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="status relative mb-3 md:mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <TextIcon className="size-5 text-gray-200"></TextIcon>
          </div>
          <textarea
            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            type="text"
            placeholder="Description"
            value={donationDesc}
            onChange={(e) => setDonationDesc(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <button
          className="mt-5 w-full py-2 px-4 bg-blue-500 text-gray-200 font-bold rounded-lg shadow-lg
            hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "ADD"
          )}
        </button>
      </form>
      <div className="pt-20 md:pt-24">
        <h3 className="text-center text-gray-200 underline mb-10">
          Donation Codes
        </h3>
        {donations ? (
          donations.map((donation) => {
            return <DonationList key={donation._id} donation={donation} />;
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
};
export default AdminDonationPage;
