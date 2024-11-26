import Logo from "../assets/img/logo.png";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <div className="w-full md:max-w-[90%] min-h-screen flex items-center flex-col md:flex-row md:justify-between md:mx-auto md:gap-20">
      <header className="header w-full md:w-full text-center mt-8 flex flex-col items-center">
        <img className="w-32 md:w-60" src={Logo} alt="" />
        <h1 className="text-gray-200 text-xl md:text-3xl mb-1 md:mb-3 font-extrabold font-mono">
          Welcome to Satsang Europe
        </h1>
        <h1 className="text-gray-200 text-xl md:text-3xl tracking-wider font-bold">
          Donation Portal
        </h1>
      </header>
      <section className="w-full">
        <Outlet />
      </section>
    </div>
  );
};
export default HomeLayout;
