import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useMemberStore } from "../store/memberStore";
import MemberList from "../features/MemberList";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const { user } = useAuthStore();
  const { getMembers, members, isLoading, error } = useMemberStore();
  useEffect(() => {
    getMembers(user.familyCode);
  }, [getMembers, user]);
  return (
    <>
      <div className="pt-20 w-full px-5 md:px-20 mb-5">
        <p className="text-gray-200 font-extrabold tracking-wider">
          Welcome <br />
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-200 font-semibold">
          Your family code is {user.familyCode}
        </p>
      </div>
      <div className="my-10 mx-auto w-full">
        <Link
          to={"/add-member"}
          className="mx-5 px-2 md:mx-20 py-2 bg-green-700 shadow-md rounded-md text-gray-200"
        >
          Add Member
        </Link>
      </div>
      <div className="pt-5 w-full px-5 md:px-20 mb-2">
        <p className="text-gray-200 font-extrabold tracking-wider mb-3">
          Family Members
        </p>
        <div className="hidden md:flex md:flex-row text-gray-200 items-center justify-between md:w-[75%] mb-2">
          <div className="underline font-extrabold">Name</div>
          <div className="underline font-extrabold">Status</div>
          <div className="underline font-extrabold">Ritwik</div>
          <div className="underline"></div>
          <div className="underline"></div>
        </div>
        {members ? (
          members.map((member) => {
            return (
              <div key={member._id}>
                <div className="flex md:hidden gap-4 text-gray-200 text-xl mb-10 w-full">
                  <div className="">
                    <div>Name: </div>
                    <div>Status: </div>
                    <div>Ritwik: </div>
                  </div>
                  <div>
                    <div className="">
                      {member.firstName} {member.lastName}
                    </div>
                    <div>{member.userStatus}</div>
                    <div>
                      {member.ritwikName && <div>{member.ritwikName}</div>}
                    </div>
                    <div>{member.isOwner && <div>Family Owner</div>}</div>
                  </div>
                </div>
                <div className="hidden md:flex text-gray-200 items-center justify-between text-justify md:w-[75%] mb-2">
                  <div className="md:w-1/4">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="md:w-1/4">{member.userStatus}</div>
                  <div className="md:w-1/4">
                    {member.ritwikName && <div>{member.ritwikName}</div>}
                  </div>
                  <div className="md:w-1/4">
                    {member.isOwner && <div>Family Owner</div>}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
};
export default WelcomePage;
