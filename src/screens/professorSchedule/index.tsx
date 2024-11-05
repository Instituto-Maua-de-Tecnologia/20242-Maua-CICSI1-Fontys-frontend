import { useState } from "react";
import {
  ArrowCircleLeft,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  UserCircle,
  Check,
} from "phosphor-react";

const users = [
  { name: "John Doe", status: "sent" },
  { name: "Jane Smith", status: "unsent" },
  { name: "Bob Johnson", status: "sent" },
  { name: "Alice Brown", status: "unsent" },
  { name: "Charlie Wilson", status: "sent" },
  { name: "John Doe", status: "unsent" },
  { name: "Jane Smith", status: "sent" },
  { name: "Bob Johnson", status: "unsent" },
  { name: "Alice Brown", status: "sent" },
  { name: "Charlie Wilson", status: "unsent" },
  { name: "Marcelo Zoletti", status: "verified" },
];

export default function ProfessorSchedule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllChecked, setShowAllChecked] = useState(false);
  const [showUnsentChecked, setShowUnsentChecked] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShowAllChange = () => {
    setShowAllChecked((prev) => !prev);
  };

  const handleShowUnsentChange = () => {
    setShowUnsentChecked((prev) => !prev);
  };

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .filter((user) => {
      if (searchTerm !== '') {
        return true;
      }
      if (showAllChecked && showUnsentChecked) {
        return true;
      }
      if (showAllChecked) {
        return user.status === "sent" || user.status === "verified";
      }
      if (showUnsentChecked) {
        return user.status === "unsent";
      }
      return false;
    });

  const usersToDisplay = filteredUsers.sort((a, b) => {
    if (a.status === "sent" && (b.status === "verified" || b.status === "unsent")) return -1;
    if (a.status === "verified" && b.status === "unsent") return -1;
    if (a.status === "unsent" && (b.status === "sent" || b.status === "verified")) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-[#E8E9EB] h-screen flex flex-col items-center">
      <button>
        <ArrowCircleLeft color="#000066" size={48} className="fixed left-20 top-14" />
      </button>
      <h1 className="text-black text-4xl mt-14">Professor's Schedule</h1>

      {/* Search bar */}
      <div className="mt-6 flex items-center w-[80vw]">
        <div className="w-[50vw] flex flex-row items-center justify-between h-12 px-4 py-2 border-2 border-blue rounded-xl bg-white">
          <input
            type="text"
            placeholder="Search"
            className="flex focus:outline-none text-xl w-[100%]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MagnifyingGlass color="#000066" size={32} />
        </div>

        <div className="flex flex-row items-center ml-10">
          <button className="flex items-center" onClick={handleShowAllChange}>
            <div className={`rounded-xl border-2 border-blue w-10 h-10 flex items-center justify-center`}>
              {showAllChecked && <Check color="#000066" size={24} />}
            </div>
            <p className="text-2xl pl-3 whitespace-nowrap">Show all sent</p>
          </button>
        </div>
        <div className="flex flex-row items-center ml-10">
          <button className="flex items-center" onClick={handleShowUnsentChange}>
            <div className={`rounded-xl border-2 border-blue w-10 h-10 flex items-center justify-center`}>
              {showUnsentChecked && <Check color="#000066" size={24} />}
            </div>
            <p className="text-2xl pl-3 whitespace-nowrap">Show unsent</p>
          </button>
        </div>
      </div>

      {/* Scrollable user list */}
      <div className={`w-[80%] h-[60%] pr-4 scrollable mt-4 ${usersToDisplay.length > 0 ? "overflow-y-scroll" : ""}`}>
        {usersToDisplay.length > 0 ? (
          usersToDisplay.map((user, index) => (
            <button
              key={index}
              className={`flex items-center justify-between mb-4 p-3 rounded-lg shadow w-full text-left transition-colors ${user.status === "unsent" ? "bg-black/30" : "bg-white hover:bg-light-gray"}`}
              onClick={() => alert(`Selected: ${user.name}`)}
              disabled={user.status === "unsent"}
            >
              <div className="flex items-center">
                <UserCircle size={48} className="mr-3 text-blue" />
                <p className="text-xl">{user.name}</p>
              </div>
              <div className="flex items-center">
                {(user.status === "verified") && (
                  <Check size={32} className="text-blue" />
                )}
                {(user.status === "sent" || user.status === "verified") && (
                  <MagnifyingGlassPlus size={32} className="text-blue" />
                )}
              </div>
            </button>
          ))
        ) : (
          searchTerm && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-center">No users found!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
