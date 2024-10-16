import TranslationButtons from '../components/translationButtons';
import BtnProfessor from '../assets/btn-professor.png';
function ProfessorScreen(){
    return(
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
        <TranslationButtons/>
        <div className="grid grid-cols-2 gap-8">
        <button className="w-64 h-64 bg-blue-900 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-center text-xl py-4">
            Inform Availability/Subjects
            <img src={BtnProfessor}></img>
            </div>
        </button>
        
        <button className="w-64 h-64 bg-blue-900 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-center text-xl py-4">
            Visualize Schedule
          </div>
        </button>
      </div>
    </div>
    );

}

export default ProfessorScreen