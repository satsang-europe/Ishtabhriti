import { Link, NavLink, Outlet } from "react-router-dom";
import Logout from "../utils/Logout";
import { useEffect, useState } from "react";
const AdminLayout = () => {
  const [menuDisplay, setMenuDisplay] = useState("none");

  const handleDisplay = () => {
    menuDisplay === "none" ? setMenuDisplay("block") : setMenuDisplay("none");
  };

  return (
    <div className="text-white min-h-screen">
      <nav className="w-full px-4 py-4 shadow-lg bg-gray-600 flex justify-between items-center fixed">
        <div className="md:block hidden">Satsang Europe</div>
        <div>
          <Link to={"/admin"}>Admin Portal</Link>
        </div>
        <ul className="md:flex hidden items-center font-semibold gap-5">
          <li className="mx-[10px] cursor-pointer">
            <Link to={"/admin/donations"}>Donations</Link>
          </li>
          <li className="mx-[10px] cursor-pointer">
            <Logout />
          </li>
        </ul>
        <div className="md:hidden">
          <button className="text-4xl text-center" onClick={handleDisplay}>
            &#8801;
          </button>
        </div>
      </nav>
      {menuDisplay === "block" && (
        <div
          className="w-fit h-fit px-10 py-10 bg-gray-600 pt-24 fixed right-0 top-12"
          style={{ display: menuDisplay, opacity: 50 }}
        >
          <ul className="font-semibold flex flex-col h-full justify-between gap-14">
            <li className="mx-[10px] cursor-pointer">
              <Link to={"/admin/donations"}>Donations</Link>
            </li>
            <li className="mx-[10px] cursor-pointer">
              <Logout />
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default AdminLayout;
