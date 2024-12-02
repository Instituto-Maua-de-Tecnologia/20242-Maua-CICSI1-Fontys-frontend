import React, {useState, ChangeEvent, useContext} from 'react';
import TranslationButtons from '@/components/translationButtons';
import BtnCoordinator from '@/assets/images/btn-professor.png';
import BtnCoordinator2 from '@/assets/images/btn-professor2.png';
import LogoChat from '@/assets/images/chatLogo.png';
import { useLanguage } from '@/components/languageProvider';
import {useNavigate} from "react-router-dom";
import {ScheduleContext} from "@/context/schedule_context.tsx";
import { msalInstance } from '@/api/auth/msalConfig';
import {useEffect} from "react";

const translations = {
  en: {
    generateSchedule: 'Generate Schedule',
    professorsSchedule: 'Professor\'s Schedule',
    buttonChatGPT: 'Generate schedule with ChatGPT',
    computerScience: 'Computer Science',
    course: 'Course',
    informationSystems: 'Information Systems',
    AIDataScience: 'AI and Data Science',
    yearHalf: 'Year half:',
    first: '1st',
    second: '2nd',
    generateButton: 'Generate',
  },
  pt: {
    generateSchedule: 'Gerar Grade de Horários',
    professorsSchedule: 'Horário dos Professores',
    buttonChatGPT: 'Gerar  grade de horários com ChatGPT',
    computerScience: 'Ciência da Computação',
    course: 'Curso',
    informationSystems: 'Sistemas de Informação',
    AIDataScience: 'IA e Ciência de Dados',
    yearHalf: 'Semestre:',
    first: '1º',
    second: '2º',
    generateButton: 'Gerar'
  }
};

function CoordinatorScreen() {

  const {currentLanguage} = useLanguage();

  const [popupVisible, setPopupVisible] = useState(false);
  const [algorithm, setAlgorithm] = useState(false);
  const [selectedYearHalf, setSelectedYearHalf] = useState('1');
  const { generateSchedule, generateWithAI } = useContext(ScheduleContext);

    useEffect(() => {
        const currentAccount = msalInstance.getActiveAccount();
        if (!currentAccount) {
            navigate('/');
        }
    }, [navigate]);

  const handleYearHalfChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedYearHalf(event.target.value);
  };

  const navigate = useNavigate();
  const handleProfessorScheduleClick = () => {
    navigate('/professors_schedule');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  }

  async function handleGenerateSchedule(){
    try {
      const response = await generateSchedule();
      console.log(response);
      return response;
    }
    catch (error: any) {
      return error;
    }
  }

  async function handleGenerateWithAI(){
    try {
      const response = await generateWithAI();
      return response;
    }
    catch (error: any) {
      return error;
    }
  }

  return (
      <div className="absolute top-0 left-0 w-full h-full bg-[#E8E9EB] flex flex-col justify-center items-center">
        <button
            className="fixed left-6 top-5 text-3xl text-black mb-8 hover:underline"
            onClick={handleProfileClick}
        >
          Profile
        </button>
        <TranslationButtons/>
        <div className="grid grid-cols-2 gap-20 mb-8">
          <button
              className="w-80 h-64 relative rounded-[30px] shadow-md transition-all duration-300 transform hover:scale-110 "
              style={{backgroundImage: `url(${BtnCoordinator})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              onClick={() => {
                setPopupVisible(true)
                setAlgorithm(true)
              }}
          >
            <div
                className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
              <h3 className="text-center text-2xl text-white">{translations[currentLanguage].generateSchedule}</h3>
            </div>
          </button>


          <button
              className="w-80 h-64 relative rounded-[30px] shadow-md  transition-all duration-300 transform hover:scale-110"
              style={{
                backgroundImage: `url(${BtnCoordinator2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={handleProfessorScheduleClick}
          >
            <div
                className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
              <h3 className="text-center text-2xl text-white">{translations[currentLanguage].professorsSchedule}</h3>
            </div>
          </button>
        </div>
        <div className="flex items-center mb-4">

          {/* icon alert */}
          {/* <svg
          className="ml-2 w-6 h-6 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.366-.446.878-.699 1.743-.699s1.377.253 1.743.699l5.657 6.9c.366.446.366 1.054 0 1.5l-5.657 6.9c-.366.446-.878.699-1.743.699s-1.377-.253-1.743-.699l-5.657-6.9c-.366-.446-.366-1.054 0-1.5l5.657-6.9zM11 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-1 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg> */}
          {/* <h2 className="text-center text-2xl">Generate schedule with ChatGPT</h2> */}
          {/* icon Chat GPT */}
        </div>
        <button
            className="w-150 h-16 bg-[#000066] text-white rounded-[10px] shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-110 px-6 py-2 "
            onClick={() => {
              setPopupVisible(true)
              setAlgorithm(false)
            }}>
          <span className="text-xl">{translations[currentLanguage].buttonChatGPT}</span>
          <img src={LogoChat} alt="ChatGPT Logo" className="w-10"/>

        </button>

        {popupVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setPopupVisible(false)}
              >
                &times;
              </button>
              <h2 className="text-center text-2xl mb-4">{translations[currentLanguage].generateButton}</h2>
              <div className="mb-4 flex items-center">
                <label className="block text-lg mb-0 mr-4">{translations[currentLanguage].course}</label>
                <select className="w-48 p-2 border rounded-lg">
                  <option value="course1">{translations[currentLanguage].computerScience}</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-lg mb-0 mr-4">{translations[currentLanguage].yearHalf}</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="yearHalf"
                        value="1"
                        checked={selectedYearHalf === '1'}
                        onChange={handleYearHalfChange}
                        className="form-radio bg-[#000066]"
                    />
                    <span>{translations[currentLanguage].first}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="yearHalf"
                        value="2"
                        checked={selectedYearHalf === '2'}
                        onChange={handleYearHalfChange}
                        className="form-radio bg-[#000066]"
                    />
                    <span>{translations[currentLanguage].second}</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={algorithm ? handleGenerateSchedule : handleGenerateWithAI}
                    className="w-32 h-8 bg-[#000066] text-white rounded-[10px] shadow-md hover:shadow-lg">
                  <div className="text-center text-x2">{translations[currentLanguage].generateButton}</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default CoordinatorScreen;