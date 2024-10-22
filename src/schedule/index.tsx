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
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Inform Availability</h2>
      <div className="flex justify-between">
        <div className="overflow-hidden rounded-lg border border-gray-500">
          <table className="table-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2"></th>
                {days.map((day, index) => (
                  <th style={{"width": 90}} key={index} className="border border-gray-500 p-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="border border border-gray-500 p-2">{time}</td>
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
    </div>
  );
};

export default ScheduleTable;
