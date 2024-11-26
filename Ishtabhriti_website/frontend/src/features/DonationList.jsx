const DonationList = ({ donation }) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row mb-5 mx-auto text-gray-200 items-center md:w-[75%]">
      <div className="md:w-1/5">{donation.code}</div>
      <div className="md:w-1/5">{donation.desc}</div>
    </div>
  );
};
export default DonationList;
