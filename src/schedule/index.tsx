import React, { useState, ChangeEvent } from 'react';
import TranslationButtons from '../components/translationButtons';
import { useLanguage } from '../components/languageProvider';
import {
  ArrowCircleLeft,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  UserCircle,
  Check,
} from "phosphor-react";

const translations = {
  en: {
    scheduleTitle: 'Inform Availability',
    observationsPlaceholder: 'Observations',
    avaliableText: 'Available',
    unavaliableText: 'Unavailable',
    submitButton: 'Submit',
    selectSubjects: 'Select all applicable subjects',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  },
  pt: {
    scheduleTitle: 'Informe Disponibliadade',
    observationsPlaceholder: 'Observações',
    avaliableText: 'Disponível',
    unavaliableText: 'Indisponível',
    submitButton: 'Submeter',
    selectSubjects:'Selecione todas matérias aplicáveis',
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado'
  }
};



const ScheduleTable: React.FC = () => {

  const {currentLanguage} = useLanguage();

  const [availability, setAvailability] = useState({
    mon: [],
    tue: [0, 1, 2],
    wed: [],
    thu: [0, 1, 2],
    fri: [],
    sat: [],
  });
  const [selectedAvailability, setSelectedAvailability] = useState('available');
  const [availableCells, setAvailableCells] = useState<{ [key: string]: number[] }>({});

  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAvailability(event.target.value);
  };

  const times = [
    "7h40 - 9h20", "9h30 - 11h10", "11h20 - 13h00", 
    "13h10 - 14h50", "15h00 - 16h40", "16h50 - 18h30", 
    "19h00 - 20h40", "20h50 - 22h30"
  ];

  // review for translate
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const toggleAvailability = (day: string, index: number) => {
    if (selectedAvailability === 'available') {
      setAvailableCells(prev => ({
        ...prev,
        [day]: prev[day]?.includes(index)
          ? prev[day].filter((i: number) => i !== index)
          : [...(prev[day] || []), index]
      }));
    } else {
      setAvailability(prev => ({
        ...prev,
        [day]: prev[day]?.includes(index)
          ? prev[day].filter((i: number) => i !== index)
          : [...(prev[day] || []), index]
      }));
    }
  };


  const subjects = [
    { name: "Programming Logic" },
    { name: "Linear algebra and analytical geometry"},
    { name: "Agile Development" },
    { name: "Data Structures"},
  ];

  return (
    <div className="p-5">
      <TranslationButtons/>
      <h2 className="text-center text-3xl text-black mb-8">{translations[currentLanguage].scheduleTitle}</h2>
      <div className="flex justify-between items-center mb-4 p-4 pb-0 pt-0">
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="availability"   value="available" checked={selectedAvailability === 'available'} onChange={handleAvailabilityChange} className="w-4 h-4 mr-2" />
            <span>{translations[currentLanguage].avaliableText}</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="availability" value="unavailable" checked={selectedAvailability === 'unavailable'} onChange={handleAvailabilityChange} className="w-4 h-4  mr-2" />
            <span>{translations[currentLanguage].unavaliableText}</span>
          </label>
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:w-1/2 p-4 pt-0">
          <table className="table-auto border-collapse border border-gray-500 rounded-lg w-full">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2"></th>
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
                      className={`border border-gray-500 p-2 cursor-pointer ${availableCells[day]?.includes(timeIndex) ? 'bg-green-500' : availability[day]?.includes(timeIndex) ? 'bg-red-500' : 'bg-white'} hover:bg-blue-200`}
                      onClick={() => toggleAvailability(day, timeIndex)}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ml">
          <h3 className="text-xl font-semibold mb-2">{translations[currentLanguage].selectSubjects}</h3>
          <div className="flex flex-col space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Subject {i + 1}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-centermb-4 pl-4 pr-4">
        <textarea placeholder={translations[currentLanguage].observationsPlaceholder} className="flex focus:outline-none text-xl w-[100%] h-24 p-2 rounded-lg bg-[#D9D9D9] align-top" rows={2} />
      </div>
    </div>
    );
};

export default ScheduleTable;