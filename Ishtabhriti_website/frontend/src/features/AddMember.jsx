import { Loader, User, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useMemberStore } from "../store/memberStore";
import { useAuthStore } from "../store/authStore";
import MemberList from "./MemberList";

const AddMember = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userStatus, setUserStatus] = useState("uninitiated");
  const [ritwikName, setRitwikName] = useState("");
  //   const [isInitiated, setIsInitiated] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getMembers, members } = useMemberStore();
  useEffect(() => {
    getMembers(user.familyCode);
  }, [getMembers, user]);
  const { addMember, isLoading, error } = useMemberStore();
  //   setIsInitiated(userStatus === "initiated" ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      confirmAlert({
        title: "Want to add the member?",
        message: `Want to add ${firstName} ${lastName}? Click Yes to confirm.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await addMember(
                user.familyCode,
                firstName,
                lastName,
                userStatus,
                ritwikName === "" ? null : ritwikName
              );
              await getMembers(user.familyCode);
            },
          },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });

      //   navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-center text-gray-200 pt-16 font-bold">Add Member</h3>
      <form
        className="w-11/12 mx-auto md:w-fit mt-2 md:mt-8 border-2 border-solid p-2 md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:gap-5">
          <div className="firstName relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User2 className="size-5 text-gray-200"></User2>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="lastName relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User2 className="size-5 text-gray-200"></User2>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="status relative mb-3 md:mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="size-5 text-gray-200"></User>
          </div>
          <select
            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            required
          >
            <option value="uninitiated">Un Initiated</option>
            <option value="initiated">Initiated</option>
          </select>
        </div>
        {userStatus === "initiated" && (
          <div className="ritwikName relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User2 className="size-5 text-gray-200"></User2>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="Ritwik Name"
              value={ritwikName}
              onChange={(e) => setRitwikName(e.target.value)}
              required
            />
          </div>
        )}
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
      <div className="pt-5 w-full px-5 md:px-20 mb-2">
        <p className="text-gray-200 font-extrabold tracking-wider mb-3">
          Family Members
        </p>
        {members ? <MemberList /> : <p>Loading</p>}
      </div>
    </>
  );
};
export default AddMember;
