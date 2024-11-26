import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import UsersList from "../features/UsersList";

const AdminDashBoard = () => {
  const { listAllUsers, users, isLoading, error } = useAuthStore();
  useEffect(() => {
    listAllUsers();
  }, [listAllUsers]);

  return (
    <div className="pt-20 md:pt-16">
      <h3 className="text-center text-gray-200 underline mb-5">
        Registered User
      </h3>
      {users ? (
        users.map((user) => {
          if (user.userStatus !== "admin" && user.isVerified) {
            return <UsersList key={user._id} user={user} />;
          }
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default AdminDashBoard;
