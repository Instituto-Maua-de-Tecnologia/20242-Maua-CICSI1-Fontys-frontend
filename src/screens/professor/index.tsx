import { useLanguage } from '@/components/languageProvider';
import TranslationButtons from '@/components/translationButtons';
import BtnCoordinator from '@/assets/images/btn-professor.png';
import BtnCoordinator2 from '@/assets/images/btn-professor2.png';
import { msalInstance } from '@/api/auth/msalConfig';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Professor() {
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();
  const {currentLanguage} = useLanguage();

  useEffect(() => {
    const currentAccount = msalInstance.getActiveAccount();
    if (currentAccount && currentAccount.idTokenClaims) {
      setName(currentAccount.idTokenClaims.name || null);
    }
  }, []);

  const handleVisualizeScheduleClick = () => {
    navigate('/visualize_schedule');
  };

  const handleInformAvailabilityClick = () => {
    navigate('/inform_availability');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  }

  const translations = {
    en: {
      professorIndex:`Hello, ${name || 'Professor'}!`,
      informAvailability: 'Inform Availability/Subjects',
      visualizeSchedule: 'Visualize Schedule'
    },
    pt: {
      professorIndex:`Olá, ${name || 'Professor'}!`,
      informAvailability: 'Informar Disponibilidade/Matérias',
      visualizeSchedule: 'Visualizar Horário'
    }
  };

  return (

      <div className="absolute top-0 left-0 w-full h-full bg-light-gray flex flex-col justify-center items-center">
        <button
            className="fixed left-6 top-5 text-3xl text-black mb-8 hover:underline"
            onClick={handleProfileClick}
        >
          Profile
        </button>

        <TranslationButtons/>
        <h2 className='text-center text-3xl text-black mb-8'>{translations[currentLanguage].professorIndex}</h2>
        <div className="grid grid-cols-2 gap-20 mb-20">
          <button
              className="w-80 h-64 relative rounded-[30px] shadow-md transition-all duration-300 transform hover:scale-110 "
              style={{backgroundImage: `url(${BtnCoordinator})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              onClick={handleInformAvailabilityClick}
          >
            <div
                className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
              <h3 className="text-center text-2xl text-white">{translations[currentLanguage].informAvailability}</h3>
            </div>
          </button>
          <button
              className="w-80 h-64 relative rounded-[30px] shadow-md  transition-all duration-300 transform hover:scale-110"
              style={{
                backgroundImage: `url(${BtnCoordinator2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={handleVisualizeScheduleClick}
          >
            <div
                className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
              <h3 className="text-center text-2xl text-white">{translations[currentLanguage].visualizeSchedule}</h3>
            </div>
          </button>
        </div>
      </div>
  );
}
