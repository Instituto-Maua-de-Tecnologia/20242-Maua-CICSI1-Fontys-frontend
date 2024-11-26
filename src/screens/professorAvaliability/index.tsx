import React, { useState, ChangeEvent } from 'react';
import TranslationButtons from '@/components/translationButtons';
import { useLanguage } from '@/components/languageProvider';
import {
  ArrowCircleLeft,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  UserCircle,
  Check,
} from "phosphor-react";

const translations = {
  en: {
    scheduleTitle: 'Professors Schedule',
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
    saturday: 'Saturday',
    buttonUpdate:'Update'
  },
  pt: {
    scheduleTitle: 'Disponibilidade Professor',
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
    saturday: 'Sábado',
    buttonUpdate:'Atualizar'
  }
};
const ProfessorAvaliability: React.FC = () => {

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


    // review for translate

    const subjects = [
      { name: "Programming Logic" },
      { name: "Linear algebra and analytical geometry"},
      { name: "Agile Development" },
      { name: "Data Structures"},
    ];

    const styles = {
      style: {
        "background-color": "#000066",
        "color": "white"
      }
    }

    return (
      <div className="p-5">
        <button>
          <ArrowCircleLeft color="#000066" size={48} className="fixed left-3 top-" />
        </button>
        <TranslationButtons/>
        <h2 className="text-center text-3xl text-black mb-8">{translations[currentLanguage].scheduleTitle}</h2>
        <div className="flex justify-between items-center mb-4 p-4 pb-0 pt-0">
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="availability"   value="available"/>
              <span>{translations[currentLanguage].avaliableText}</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="availability" value="unavailable"/>
              <span>{translations[currentLanguage].unavaliableText}</span>
            </label>
          </div>
        </div>

        <div className="flex">
        <div className="p-5">
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
                        className={`border border-gray-500 p-2 cursor-pointer ${availableCells[day]?.includes(timeIndex) ? 'bg-[#2B49A3]' : availability[day]?.includes(timeIndex) ? 'bg-[#CC0000]' : 'bg-white'} hover:bg-Blue-200`}
                        onClick={() => toggleAvailability(day, timeIndex)}
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
      <div className="ml p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">{translations[currentLanguage].selectSubjects}</h3>
        <div className="flex flex-col space-y-2">
          {subjects.map((value, i) => (
            <label key={i} className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-6 h-6"/>
              <span className="text-lg">{value.name}</span>
            </label>
          ))}
        </div>
      </div>
      </div>
      <div className="flex justify-between items-centermb-4 pl-4 pr-4">
        <textarea placeholder={translations[currentLanguage].observationsPlaceholder} className="flex focus:outline-none text-xl w-[100%] h-24 p-2 rounded-lg bg-[#D9D9D9] align-top" rows={2} style={{"resize": 'none'}}/>
      </div>
      <div className='flex justify-end'>
          <button className="p-3 rounded-lg me-5 mt-2" style={styles.style}>{translations[currentLanguage].buttonUpdate}</button>
      </div>
    </div>
    );
  };

  export default ProfessorAvaliability;