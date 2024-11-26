import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const UsersList = ({ user }) => {
  const [userApprove, setUserApprove] = useState(user.isApproved);
  const { approveUser, isLoading } = useAuthStore();
  const handleApprove = () => {
    approveUser(user._id);
    setUserApprove(true);
  };
  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between mb-5 mx-auto text-gray-200 items-center md:w-[75%]">
      <div className="md:w-1/5">
        {user.firstName} {user.lastName}
      </div>
      <div className="md:w-1/5">{user.email}</div>
      {!userApprove && (
        <button
          className=" px-2 py-2 bg-green-700 shadow-md rounded-md"
          onClick={handleApprove}
        >
          Approve
        </button>
      )}
      <button className="px-2 py-2 bg-red-700">Delete</button>
      <button className="px-2 py-2 bg-yellow-700">Update</button>
    </div>
  );
};
export default UsersList;
