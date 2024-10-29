import TranslationButtons from '../components/translationButtons';
import BtnCoordinator from '../assets/btn-professor.png';
import BtnCoordinator2 from '../assets/btn-professor2.png';
import { useLanguage } from '../components/languageProvider';

const translations = {
  en: {
    professorIndex:'Hello, Name!',
    informAvailability: 'Inform Availability/Subjects',
    visualizeSchedule: 'Visualize Schedule'
  },
  pt: {
    professorIndex:'Olá, Nome!',
    informAvailability: 'Informar Disponibilidade/Matérias',
    visualizeSchedule: 'Visualizar Horário'
  }
};

// change name!

export default function Professor() {
  const {currentLanguage} = useLanguage();
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-light-gray flex flex-col justify-center items-center">
      <TranslationButtons />
      <h2 className='text-center text-3xl text-black mb-8'>{translations[currentLanguage].professorIndex}</h2>
      <div className="grid grid-cols-2 gap-20 mb-20">
        <button
            className="w-80 h-64 relative rounded-[30px] shadow-md transition-all duration-300 transform hover:scale-110 "
            style={{ backgroundImage: `url(${BtnCoordinator})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
            <h3 className="text-center text-2xl text-white">{translations[currentLanguage].informAvailability}</h3>
          </div>
        </button>


        <button
          className="w-80 h-64 relative rounded-[30px] shadow-md  transition-all duration-300 transform hover:scale-110"
          style={{ backgroundImage: `url(${BtnCoordinator2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
        <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
        <h3 className="text-center text-2xl text-white">{translations[currentLanguage].visualizeSchedule}</h3>
          </div>
        </button>
      </div>
    </div>
  );
}
