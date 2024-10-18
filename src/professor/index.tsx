import React, { useState, ChangeEvent } from 'react';
import TranslationButtons from '../components/translationButtons';
import BtnCoordinator from '../assets/btn-professor.png';
import BtnCoordinator2 from '../assets/btn-professor2.png';


function ProfessorScreen() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#E8E9EB] flex flex-col justify-center items-center">
      <TranslationButtons />
      <text className='text-center text-3xl text-black mb-8'>Hello, Name!</text>
      <div className="grid grid-cols-2 gap-20 mb-20">
        <button
            className="w-80 h-64 relative rounded-[30px] shadow-md transition-all duration-300 transform hover:scale-110 "
            style={{ backgroundImage: `url(${BtnCoordinator})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
            <div className="text-center text-3xl text-white">
              Inform Availability/Subjects
            </div>
          </div>
        </button>


        <button
          className="w-80 h-64 relative rounded-[30px] shadow-md  transition-all duration-300 transform hover:scale-110"
          style={{ backgroundImage: `url(${BtnCoordinator2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
        <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
          <div className="text-center text-3xl text-white">
            Visualize Schedule
          </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProfessorScreen;