import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import TranslationButtons from '@/components/translationButtons';
import { useLanguage } from '@/components/languageProvider';
import {
  Check,
  ArrowCircleLeft,
} from "phosphor-react";

const translations = {
  en: {
    scheduleTitle: 'Inform Availability',
    observationsPlaceholder: 'Observations',
    avaliableText: 'Available',
    unavaliableText: 'Unavailable',
    submitButton: 'Submit',
    selectSubjects: 'Select all applicable subjects',
    buttonSend: 'Send',
    days: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
    },
    subjects: [
      "Programming Logic",
      "Linear Algebra and Analytical Geometry",
      "Agile Development",
      "Calculus",
      "Software Engineering",
      "Database NO-SQL",
      "Multiplatform Development",
      "Computing Theory",
    ],
  },
  pt: {
    scheduleTitle: 'Informe Disponibilidade',
    observationsPlaceholder: 'Observações',
    avaliableText: 'Disponível',
    unavaliableText: 'Indisponível',
    submitButton: 'Enviar',
    selectSubjects: 'Selecione todas matérias aplicáveis',
    buttonSend: 'Enviar',
    days: {
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira',
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado',
    },
    subjects: [
      "Lógica de Programação",
      "Álgebra Linear e Geometria Analítica",
      "Desenvolvimento Ágil",
      "Cálculo",
      "Engenharia de Software",
      "Banco de Dados NO-SQL",
      "Desenvolvimento Multiplataforma",
      "Teoria da Computação",
    ],
  },
};

const Schedule: React.FC = () => {

  const { currentLanguage } = useLanguage();

  const [availability, setAvailability] = useState({
    mon: [],
  });
  const [selectedAvailability, setSelectedAvailability] = useState('available');
  const [availableCells, setAvailableCells] = useState<{ [key: string]: number[] }>({});
  const days = Object.values(translations[currentLanguage].days);

  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAvailability(event.target.value);
  };

  const times = [
    "7h40 - 9h20", "9h30 - 11h10", "11h20 - 13h00",
    "13h10 - 14h50", "15h00 - 16h40", "16h50 - 18h30",
    "19h00 - 20h40", "20h50 - 22h30"
  ];

  // review for translate
  const subjects = translations[currentLanguage].subjects.map((subject) => ({
    name: subject
  }));

  const toggleAvailability = (day: string, index: number) => {
    if (selectedAvailability === 'available') {
      setAvailableCells((prev) => ({
        ...prev,
        [day]: prev[day]?.includes(index)
          ? prev[day].filter((i: number) => i !== index) // Remove a célula se já estiver selecionada
          : [...(prev[day] || []), index], // Adiciona a célula
      }));
      setAvailability((prev) => ({
        ...prev,
        [day]: prev[day]?.filter((i: number) => i !== index), // Remove da lista de indisponíveis
      }));
    } else {
      setAvailability((prev) => ({
        ...prev,
        [day]: prev[day]?.includes(index)
          ? prev[day].filter((i: number) => i !== index) // Remove a célula se já estiver selecionada
          : [...(prev[day] || []), index], // Adiciona a célula
      }));
      setAvailableCells((prev) => ({
        ...prev,
        [day]: prev[day]?.filter((i: number) => i !== index), // Remove da lista de disponíveis
      }));
    }
  };

  const styles = {
    style: {
      "background-color": "#000066",
      "color": "white"
    }
  }

  const [isBlue, setIsBlue] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const toggleSubjectSelection = (index: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const handleAvailableClick = () => {
    setSelectedAvailability('available');
    setIsBlue(true);
    setIsRed(false);
  };
  const handleUnavailableClick = () => {
    setSelectedAvailability('unavailable');
    setIsBlue(false);
    setIsRed(true);
  };
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-5 bg-[#E8E9EB] h-screen">
      <button>
        <ArrowCircleLeft
          color="#000066"
          size={48}
          className="fixed left-5 top-5"
          onClick={handleReturnClick}
        />
      </button>
      <TranslationButtons />
      <h2 className="text-center text-3xl font-medium text-black mb-8">{translations[currentLanguage].scheduleTitle}</h2>
      <div className='flex flex-row px-10'>
        <div className="flex gap-2 mb-4 p-4 pb-0 pt-0">
          <div className={`rounded-xl border-2 border-black w-6 h-6 flex items-center justify-center ${isBlue ? 'bg-[#2B49A3]' : 'bg-[#E8E9EB]'}`}>
            <button onClick={handleAvailableClick} className="w-full h-full focus:outline-none" />
          </div>
          <p className='text-base'>{translations[currentLanguage].avaliableText}</p>
        </div>
        <div className="flex gap-2 mb-4 p-4 pb-0 pt-0">
          <div className={`rounded-xl border-2 border-black w-6 h-6 flex items-center justify-center ${isRed ? 'bg-[#CC0000]' : 'bg-[#E8E9EB]'}`}>
            <button onClick={handleUnavailableClick} className="w-full h-full focus:outline-none" />
          </div>
          <p className='text-base'>{translations[currentLanguage].unavaliableText}</p>
        </div>
      </div>
      <div className="flex px-10">
        <div className="p-5">
          {/* <h2 className="text-2xl font-semibold mb-4">Inform Availability</h2>  */}
          <div className="flex justify-between">
            <div className="overflow-hidden rounded-lg border border-gray-500">
              <table className="table-auto border-collapse">
                <thead>
                  <tr>
                    <th style={{ "width": 130 }} className="border border-gray-500 p-2"></th>
                    {days.map((day, index) => (
                      <th style={{ "width": 130 }} key={index} className="border border-gray-500 p-2">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                      <td className={`border p-2 justify-center items-center flex ${timeIndex === times.length - 1 ? '' : 'border-b-gray-500'
                        }`}>{time}</td>
                      {days.map((day, dayIndex) => (
                        <td
                          key={dayIndex}
                          className={`border border-gray-500 p-2 cursor-pointer ${availableCells[day]?.includes(timeIndex) ? 'bg-[#2B49A3]' : availability[day]?.includes(timeIndex) ? 'bg-[#CC0000]' : 'bg-[#E8E9EB]'} hover:bg-blue-200`}
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
          <div className="flex flex-col space-y-2 overflow-y-auto max-h-60">
            {subjects.map((value, i) => (
              <div
                className="flex items-center space-x-2 border-2 rounded-xl cursor-pointer"
                key={i}
                onClick={() => toggleSubjectSelection(i)}
              >
                <div className="border-Blue flex items-center justify-center w-8 h-8 border-2 rounded-xl ml-10">
                  {selectedSubjects.includes(i) && <Check size={24} weight="bold" color="#2B49A3" />}
                </div>
                <p className="text-left text-xl pr-4 pl-2">{value.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-centermb-4 pl-14 pr-4 w-[90%]">
        <textarea placeholder={translations[currentLanguage].observationsPlaceholder} className="flex placeholder-black focus:outline-none text-base text-black w-[100%] h-24 p-2 rounded-xl bg-[#D9D9D9] align-top" rows={2} style={{ "resize": 'none' }} />
      </div>
      <div className='flex justify-end'>
        <button className="px-2 rounded-lg mt-4 w-32 h-10 text-2xl mr-4 " style={styles.style}>{translations[currentLanguage].buttonSend}</button>
      </div>
    </div>
  );
};

export default Schedule;
