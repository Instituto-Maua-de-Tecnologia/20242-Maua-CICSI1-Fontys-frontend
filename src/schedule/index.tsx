import React, { useState } from 'react';

const ScheduleTable: React.FC = () => {
  const [availability, setAvailability] = useState({
    mon: [],
    tue: [0, 1, 2],
    wed: [],
    thu: [0, 1, 2],
    fri: [],
    sat: [],
  });

  const times = [
    "7h40 - 9h20", "9h30 - 11h10", "11h20 - 13h00", 
    "13h10 - 14h50", "15h00 - 16h40", "16h50 - 18h30", 
    "19h00 - 20h40", "20h50 - 22h30"
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const toggleAvailability = (day: string, index: number) => {
    const isAvailable = availability[day]?.includes(index);
    setAvailability(prev => ({
      ...prev,
      [day]: isAvailable
        ? prev[day].filter((i: number) => i !== index)
        : [...(prev[day] || []), index]
    }));
  };

  return (
    
    <div className=" absolute left-0 w-full h-full bg-[#E8E9EB] flex flex-col p-5">
      <h2 className="text-center text-3xl text-black mt-10 mb-4">Inform Availability</h2>
      <div className=" flex mb-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
          <input type="radio" name="availability" className="w-4 h-4  text-red-500 "/>
            <span>Available</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="availability" className="w-4 h-4"/>
            <span>Unavailable</span>
          </label>
        </div>
      </div>

      

      <div className="flex justify-between">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 p-2 "></th>
              {days.map((day, index) => (
                <th key={index} className="border border-gray-500 p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td className="border border-gray-500 p-2">{time}</td>
                {days.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`border border-gray-500 p-2 cursor-pointer ${availability[day.toLowerCase()]?.includes(timeIndex) ? 'bg-blue-500' : 'bg-white'} hover:bg-blue-200`}
                    onClick={() => toggleAvailability(day.toLowerCase(), timeIndex)}
                  >
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        </div>
    </div>
  );
};

export default ScheduleTable;


// import React, { useState, ChangeEvent } from 'react';

// const ScheduleTable: React.FC = () => {
//   const [availability, setAvailability] = useState({
//     mon: [],
//     tue: [0, 1, 2],
//     wed: [],
//     thu: [0, 1, 2],
//     fri: [],
//     sat: [],
//   });
//   const [selectedAvailability, setSelectedAvailability] = useState('available');

//   const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedAvailability(event.target.value);
//   };

//   const times = [
//     "7h40 - 9h20", "9h30 - 11h10", "11h20 - 13h00", 
//     "13h10 - 14h50", "15h00 - 16h40", "16h50 - 18h30", 
//     "19h00 - 20h40", "20h50 - 22h30"
//   ];
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   const toggleAvailability = (day: string, index: number) => {
//     const isAvailable = availability[day]?.includes(index);
//     setAvailability(prev => ({
//       ...prev,
//       [day]: isAvailable
//         ? prev[day].filter((i: number) => i !== index)
//         : [...(prev[day] || []), index]
//     }));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold mb-4">Inform Availability</h2>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center cursor-pointer">
//             <input type="radio" name="availability" value="available" checked={selectedAvailability === 'available'} onChange={handleAvailabilityChange} className="hidden" />
//             <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
//             <span>Available</span>
//           </label>
//           <label className="flex items-center cursor-pointer">
//             <input type="radio" name="availability" value="unavailable" checked={selectedAvailability === 'unavailable'} onChange={handleAvailabilityChange} className="hidden" />
//             <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
//             <span>Unavailable</span>
//           </label>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <table className="table-auto border-collapse border border-gray-500 rounded-lg w-full">
//           <thead>
//             <tr>
//               <th className="border border-gray-500 p-2"></th>
//               {days.map((day, index) => (
//                 <th key={index} className="border border-gray-500 p-2">{day}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {times.map((time, timeIndex) => (
//               <tr key={timeIndex}>
//                 <td className="border border-gray-500 p-2">{time}</td>
//                 {days.map((day, dayIndex) => (
//                   <td
//                     key={dayIndex}
//                     className={`border border-gray-500 p-2 cursor-pointer ${availability[day]?.includes(timeIndex) ? (selectedAvailability === 'available' ? 'bg-green-500' : 'bg-red-500') : 'bg-white'} hover:bg-blue-200`}
//                     onClick={() => toggleAvailability(day, timeIndex)}
//                   ></td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ScheduleTable;