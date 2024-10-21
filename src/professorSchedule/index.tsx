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
    if (!showAllChecked) {
      setShowUnsentChecked(false);
    }
  };


  const handleShowUnsentChange = () => {
    setShowUnsentChecked((prev) => !prev);
    if (!showUnsentChecked) {
      setShowAllChecked(false);
    }
  };


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );


  const usersToDisplay = showUnsentChecked
    ? filteredUsers.filter((user) => user.status === "unsent")
    : showAllChecked || searchTerm
      ? filteredUsers
      : [];

  return (
    <div className="bg-[#E8E9EB] h-screen relative">
      <button>
        <ArrowCircleLeft
          color="#000066"
          size={48}
          className="fixed left-20 top-14"
        />
      </button>
      <h1 className="text-[#000000] text-4xl absolute top-14 left-1/2 transform -translate-x-1/2">
        Professor's Schedule
      </h1>

      {/* Search bar */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-[600px] h-12 px-4 py-2 border-2 border-[#000066] rounded-xl focus:outline-none text-xl"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MagnifyingGlass
            color="#000066"
            size={32}
            className="absolute left-[55%]"
          />
          <div className="flex flex-row items-center ml-10">
            <button className="flex items-center" onClick={handleShowAllChange}>
              <div
                className={`rounded-xl border-2 border-[#000066] w-10 h-10 flex items-center justify-center`}
              >
                {showAllChecked && <Check color="#000066" size={24} />}
              </div>
              <p className="text-2xl pl-3 whitespace-nowrap">Show all</p>
            </button>
          </div>
          <div className="flex flex-row items-center ml-10">
            <button
              className="flex items-center"
              onClick={handleShowUnsentChange}
            >
              <div
                className={`rounded-xl border-2 border-[#000066] w-10 h-10 flex items-center justify-center`}
              >
                {showUnsentChecked && <Check color="#000066" size={24} />}
              </div>
              <p className="text-2xl pl-3 whitespace-nowrap">Show unsent</p>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable user list */}
      {usersToDisplay.length > 0 ? (
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-[70%] h-[60%] overflow-y-scroll border-2 rounded-lg p-4">
          {usersToDisplay.map((user, index) => (
            <button
              key={index}
              className={`flex items-center mb-4 p-3 rounded-lg shadow w-full text-left hover:bg-[#E8E9EB] transition-colors ${user.status === "unsent" ? "bg-black/30" : "bg-white"
                }`}
              onClick={() => alert(`Selected: ${user.name}`)}
            >
              <UserCircle size={48} color="#000066" className="mr-3" />
              <p className="text-xl">{user.name}</p>
              <MagnifyingGlassPlus
                color="#000066"
                size={32}
                className="ml-auto"
              />
            </button>
          ))}
        </div>
      ) : (
        searchTerm && (
          <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-[70%] h-[60%] flex justify-center items-center">
            <p className="text-xl text-center">No users found!</p>
          </div>
        )
      )}
    </div>
  );
}
