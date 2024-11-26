import { Link, NavLink, Outlet } from "react-router-dom";
import Logout from "../utils/Logout";

const WelcomeLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <nav className="w-full h-14 bg-yellow-400 flex justify-between px-4 items-center md:px-8 fixed">
        <div className="text-2xl font-bold text-blue-700 md:px-12">
          Satsang Europe
        </div>
        <ul className="md:flex hidden font-semibold">
          <Link
            to="/home"
            className="mx-[10px] cursor-pointer active:text-blue-500"
          >
            Home
          </Link>
          <Link to="/home/add-member" className="mx-[10px] cursor-pointer">
            Member
          </Link>
          <Link to="/home/make-donation" className="mx-[10px] cursor-pointer">
            Donate
          </Link>
        </ul>
        <div className="hidden md:block">
          <Logout />
        </div>
        <div className="md:hidden text-4xl">
          <a href="#">&#8801;</a>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default WelcomeLayout;
