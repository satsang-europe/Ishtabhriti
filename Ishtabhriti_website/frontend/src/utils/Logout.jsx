import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const Logout = () => {
  const navigate = useNavigate();
  const { logout, isLoading, error } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-1 bg-gray-600 px-3 py-2 rounded-lg">
      <button className="text-green-200 flex gap-2" onClick={handleLogout}>
        Logout
        <LogOutIcon />
      </button>
    </div>
  );
};
export default Logout;
