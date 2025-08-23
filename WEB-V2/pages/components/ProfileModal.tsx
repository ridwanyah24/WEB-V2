import React, { useState } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { RiLoader2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { updateName } from "@/utils/api-service";

interface ProfileProps {
  closeModal: () => void;
}

const ProfileModal: React.FC<ProfileProps> = ({ closeModal }) => {
  const [newName, setNewName] = useState("");
  const [updateStarted, setUpdateStarted] = useState(false);

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.signin);
  const { user } = useAppSelector((state) => state.user);

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      toast.error("Please enter a new name");
      return;
    }

    const firstName = newName.split(" ")[0];
    const lastName = newName.split(" ").slice(1).join(" ");

    setUpdateStarted(true);

    try {
      const result = await updateName(firstName, lastName, token!, dispatch);

      if (result.success) {
        toast.success("Update successful");
        closeModal();
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdateStarted(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/20 flex items-center justify-center z-50">
      <section className="bg-[#f2feff] p-6 rounded-xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#05353A]">Personal Details</h2>
          <button onClick={closeModal} className="text-[#05353A]">
            <MdClose size={24} />
          </button>
        </div>

        {/* Profile picture with edit button */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <Image
              src="/man.png"
              alt="Profile of user"
              className="rounded-full cursor-pointer"
              width="100"
              height="100"
            />
            <button
              className="absolute bottom-0 right-0 bg-[#05353A] text-white p-2 rounded-full hover:bg-[#05353A]/90 transition-colors"
              onClick={() => console.log("Edit profile picture clicked")}
              aria-label="Edit profile picture"
            >
              <FiEdit size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#05353A] mb-1">
              Current name
            </label>
            <div className="p-2 rounded-xl border border-[#05353A]/20 capitalize">
              {user?.firstName} {user?.lastName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#05353A] mb-1">
              New name
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-xl border border-[#05353A]/20 focus:outline-none focus:ring-1 focus:ring-[#05353A]"
              placeholder="New name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button className="text-red-500 font-medium mt-2">
              Delete Account
            </button>
          </div>
        </div>

        <div className="mt-6 flex">
          <button
            onClick={handleUpdateName}
            disabled={updateStarted}
            className="bg-[#05353A] text-white py-2 px-6 w-full rounded-lg font-medium flex items-center justify-center disabled:opacity-50"
          >
            {updateStarted ? (
              <>
                <RiLoader2Fill className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Done"
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileModal;
