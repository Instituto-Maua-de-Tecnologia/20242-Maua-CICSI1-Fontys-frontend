import { useLanguage } from '../languageProvider';
import english from '../../assets/english.svg';
import portuguese from '../../assets/portuguese.svg';

export default function TranslationButtons() {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  return (
    <div className="">
      <div className='absolute top-5 right-5'>
        <button
          className={`transition duration-200 transform hover:scale-110 ${currentLanguage === 'pt' ? '' : 'opacity-50 shadow-lg'}`}
          onClick={() => {
            setCurrentLanguage('pt');
            localStorage.setItem("lang", 'pt');
            console.log(localStorage.getItem('lang'))
          }}
        >
          <img src={portuguese} alt="Portuguese button" />
        </button>
      </div>
      <div>
        <button
          className={`absolute top-5 right-20 transition duration-200 transform hover:scale-110 ${currentLanguage === 'en' ? '' : 'opacity-50 shadow-lg'}`}
          onClick={() => {
            setCurrentLanguage('en')
            localStorage.setItem("lang",'en');
            console.log(localStorage.getItem('lang'))
          }}
        >
          <img src={english} alt="English button" />
        </button>
      </div>
    </div>
  );
}
