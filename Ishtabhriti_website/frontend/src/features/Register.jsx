import { useState, useMemo } from "react";
import Input from "../utils/Input";
import {
  Mail,
  Lock,
  User2,
  Home,
  Globe,
  Landmark,
  LandPlot,
  User,
  UsersIcon,
  Loader,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";
import Select from "react-select";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNum, setContactNum] = useState();
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postcode, setPostcode] = useState("");
  const [userStatus, setUserStatus] = useState("uninitiated");
  const [ritwikName, setRitwikName] = useState(undefined);
  const [indianFamilyCode, setIndianFamilyCode] = useState(undefined);
  const navigate = useNavigate();
  const countryOptions = useMemo(() => countryList().getData(), []);

  const { signup, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(
        firstName,
        lastName,
        email,
        password,
        contactNum,
        streetAddress,
        country.label,
        province,
        postcode,
        userStatus,
        ritwikName,
        indianFamilyCode
      );
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  const changeCountry = (country) => {
    setCountry(country);
  };

  return (
    <section
      className="w-full flex flex-col items-center md:mt-4 mb-16 bg-slate-600 bg-opacity-50
    px-5 py-2 shadow-lg rounded-lg 
    "
    >
      <h3 className="text-gray-200 text-xl md:text-2xl font-bold md:font-extrabold">
        Register
      </h3>
      <form
        className="w-11/12 md:w-full mt-2 md:mt-8 border-2 border-solid p-2 md:p-8"
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
        <Input
          icon={Mail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PhoneInput
          placeholder="Number"
          value={contactNum}
          onChange={setContactNum}
          required
        />
        <Input
          icon={Home}
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          required
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <div className="lastName relative mb-3 md:mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Globe className="size-5 text-gray-200"></Globe>
          </div>
          <Select
            className="w-full pl-10 pr-3 py-2 text-sm bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-black placeholder-gray-400 transition duration-200"
            options={countryOptions}
            placeholder="Country"
            value={country}
            onChange={changeCountry}
            required
          />
        </div>
        <div className="flex flex-row md:flex-row md:justify-between md:gap-5">
          <div className="state relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Landmark className="size-5 text-gray-200"></Landmark>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="State"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </div>

          <div className="postcode relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LandPlot className="size-5 text-gray-200"></LandPlot>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="Post Code"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
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

          <div className="ritwik relative mb-3 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="size-5 text-gray-200"></User>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              type="text"
              placeholder="Ritwik's Name"
              value={ritwikName}
              onChange={(e) => setRitwikName(e.target.value)}
              disabled={userStatus !== "initiated"}
            />
          </div>
        </div>
        <Input
          icon={UsersIcon}
          type="text"
          placeholder="Indian Family Code (optional)"
          value={indianFamilyCode}
          required
          onChange={(e) => setIndianFamilyCode(e.target.value)}
          disabled={userStatus !== "initiated"}
        />
        <div className="flex flex-col text-center md:flex-row items-center justify-center gap-2">
          <p className="text-gray-200">
            By clicking on SIGN UP, you are accepting the
          </p>
          <a href="#" className="text-blue-300 font-bold hover:text-blue-500">
            Privacy Policy
          </a>
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
            "SIGN UP"
          )}
        </button>
      </form>
      <div className="px-8 py-4 flex justify-center">
        <p className="text-gray-200">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Register;
