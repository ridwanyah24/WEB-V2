import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { updateUserName } from "@/utils/api-service";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";

interface UsernameModalProps {
  closeModal: () => void;
}

const UsernameModal: React.FC<UsernameModalProps> = ({ closeModal }) => {
  const [newUsername, setNewUsername] = useState("");
  const [updateStarted, setUpdateStarted] = useState(false);
  const { token } = useAppSelector((state) => state.signin);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      toast.error("Please enter a new username");
      return;
    }
    setUpdateStarted(true);

    try {
      const result = await updateUserName(newUsername, token!, dispatch);

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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#05353A]">Username</h2>
          <button
            onClick={closeModal}
            className="text-[#05353A] hover:text-[#05353A]/80 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#05353A] mb-2">
              Current name
            </label>
            <div className=" p-2 rounded-xl border border-[#05353A]/20">
              {user?.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#05353A] mb-2">
              New username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 rounded-xl border border-[#05353A]/20 focus:outline-none focus:ring-1 focus:ring-[#05353A]"
              placeholder="New username"
              required
            />
          </div>

          <p className="text-sm text-[#05353A]/70 -mt-4">
            Username can be changed once every six months
          </p>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#05353A] text-white py-3 px-6 w-full rounded-lg font-medium hover:bg-[#05353A]/90 transition-colors flex items-center justify-center"
              disabled={updateStarted}
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
        </form>
      </section>
    </div>
  );
};

export default UsernameModal;
