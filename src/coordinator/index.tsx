import React, { useState, ChangeEvent } from 'react';
import TranslationButtons from '../components/translationButtons';
import BtnCoordinator from '../assets/btn-professor.png';
import BtnCoordinator2 from '../assets/btn-professor2.png';
import LogoChat from '../assets/chatLogo.png';


function CoordinatorScreen() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedYearHalf, setSelectedYearHalf] = useState('');

  const handleGenerateScheduleClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleYearHalfChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedYearHalf(event.target.value);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#E8E9EB] flex flex-col justify-center items-center">
      <TranslationButtons />
      <div className="grid grid-cols-2 gap-20 mb-8">
        <button
            className="w-80 h-64 relative rounded-[30px] shadow-md transition-all duration-300 transform hover:scale-110 "
            style={{ backgroundImage: `url(${BtnCoordinator})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            onClick={handleGenerateScheduleClick}
          >
          <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
            <div className="text-center text-3xl text-white">
              Generate Schedule
            </div>
          </div>
        </button>


        <button
          className="w-80 h-64 relative rounded-[30px] shadow-md  transition-all duration-300 transform hover:scale-110"
          style={{ backgroundImage: `url(${BtnCoordinator2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
        <div className="absolute inset-0 rounded-[30px] flex justify-center items-center bg-black hover:bg-opacity-30 transition-all duration-300 opacity-0 hover:opacity-100">
          <div className="text-center text-3xl text-white">
            Professor's Schedule
          </div>
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
      <button className="w-150 h-16 bg-[#000066] text-white rounded-[10px] shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-110 px-6 py-2 " onClick={handleGenerateScheduleClick}>
        <span className="text-xl">Generate schedule with ChatGPT</span>
        <img src={LogoChat} alt="ChatGPT Logo" className="w-10" />
        
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <h2 className="text-center text-2xl mb-4">Generate Schedule</h2>
            <div className="mb-4 flex items-center">
              <label className="block text-lg mb-0 mr-4">Course:</label>
              <select className="w-48 p-2 border rounded-lg">
                <option value="course1">Computer Science</option>
                <option value="course2">Information Systems</option>
                <option value="course3">AI and Data Science</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-lg mb-0 mr-4">Year half:</label>
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
                  <span>1st</span>
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
                  <span>2nd</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="w-32 h-8 bg-[#000066] text-white rounded-[10px] shadow-md hover:shadow-lg">
                <div className="text-center text-x2">Generate</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoordinatorScreen;