import { Loader } from "lucide-react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useMemberStore } from "../store/memberStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const MemberList = () => {
  const { user } = useAuthStore();
  const { getMembers, members, deleteMember, isLoading, error } =
    useMemberStore();

  useEffect(() => {
    getMembers(user.familyCode);
  }, [getMembers, user]);

  const handleDelete = async (member) => {
    try {
      confirmAlert({
        title: "Confirm to delete?",
        message: `Are you sure want to delete the user ${member.firstName}? Once deleted can not be created user with same name.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await deleteMember(member._id);
              getMembers(user.familyCode);
            },
          },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const content = members.map((member) => {
    if (!member.isDeleted) {
      return (
        <div key={member._id}>
          <div className="flex md:hidden gap-4 text-gray-200 text-xl mb-10 w-full">
            <div className="">
              <div>Name: </div>
              <div>Status: </div>
              <div>Ritwik: </div>
              <div></div>
            </div>
            <div>
              <div className="">
                {member.firstName} {member.lastName}
              </div>
              <div>{member.userStatus}</div>
              <div>{member.ritwikName && <div>{member.ritwikName}</div>}</div>
              <div>{member.isOwner && <div>Family Owner</div>}</div>
            </div>
            <div className="flex flex-col items-end justify-center gap-3 ml-auto w-1/3">
              {!member.isOwner && (
                <button
                  className="px-2 py-1 bg-red-500 rounded-lg"
                  onClick={() => handleDelete(member)}
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" size={24} />
                  ) : (
                    "DELETE"
                  )}
                </button>
              )}
              <button className="px-2 py-1 bg-gray-500 rounded-lg">
                UPDATE
              </button>
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
            <div className="flex justify-start gap-3 ml-auto w-1/3">
              {!member.isOwner && (
                <button
                  className="px-2 py-1 bg-red-500 rounded-lg"
                  onClick={() => handleDelete(member)}
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" size={24} />
                  ) : (
                    "DELETE"
                  )}
                </button>
              )}
              <button className="px-2 py-1 bg-gray-500 rounded-lg">
                UPDATE
              </button>
            </div>
          </div>
        </div>
      );
    }
  });
  return content;
};
export default MemberList;
