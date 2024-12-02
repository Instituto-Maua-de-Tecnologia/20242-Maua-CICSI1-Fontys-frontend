import React, {useEffect, useState} from "react";
import { useLanguage } from "@/components/languageProvider";
import TranslationButtons from "@/components/translationButtons";
import {Check, Download, Question, XCircle} from "phosphor-react";

export default function ProfessorRegistration() {
  const { currentLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showCheck, setShowCheck] = useState(false);
  const [incorrectFile, setIncorrectFile] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const handleButtonClick = () => {
    setShowCheck(prevShowCheck => !prevShowCheck);
    if (!showCheck) {
      // Seleciona todos os índices
      setSelectedIndexes(names.map((_, index) => index));
    } else {
      // Desmarca todos os índices
      setSelectedIndexes([]);
    }
  };

  const handleCheckboxToggle = (index: number) => {
    setSelectedIndexes((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Remove if already selected
        return prevSelected.filter((i) => i !== index);
      } else {
        // Add if not selected
        return [...prevSelected, index];
      }
    });
  };

  const names = ["João Silva", "Maria Oliveira", "Pedro Santos", "Ana Souza", "Carlos Lima", "Mariana Pereira", "José Almeida", "Luana Costa", "Rafaela Martins", "Fernando Carvalho", "Marcelo Zoletti"];

  const translations = {
    en: {
      title: 'Professor Registration',
      selectFile: 'Select a file or drag it here',
      button: 'Select file',
      sendFilePart1: 'Send a',
      sendFileXLSX: '.xlsx',
      sendFilePart2: 'file',
      titleModal: 'Verify Professors',
      buttonModal: "Confirm",
      verifiedAll: "Verified All",
      incorrectFile: "Incorrect file format",
      popupTitle: "The .xlsx file must have a column named \"Professors\".",
      sendButton: 'Send',
    },
    pt: {
      title: 'Cadastro de Professores',
      selectFile: 'Selecione um arquivo ou arraste-o aqui',
      button: 'Selecionar arquivo',
      sendFilePart1: 'Envie um arquivo',
      sendFileXLSX: '.xlsx',
      sendFilePart2: '',
      titleModal: 'Professores Verificados',
      buttonModal: "Confirmar",
      verifiedAll: "Marcar Todos",
      incorrectFile: "Formato de arquivo incorreto",
      popupTitle: "O arquivo .xlsx deve possuir uma coluna chamada \"Professores\".",
      sendButton: 'Enviar',
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsEnter(false);
    const lastFile = e.dataTransfer.files[e.dataTransfer.files.length - 1];
    if(lastFile.name.endsWith('.xlsx')) {
      setIncorrectFile(false);
      setFile(lastFile);
    }
    else {
      setIncorrectFile(true);
      setFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    setIsEnter(true);
  };

  const handleDragLeave = () => {
    setIsEnter(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx')) {
        setIncorrectFile(false);
        setFile(selectedFile);
      } else {
        setIncorrectFile(true);
        setFile(null);
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleHelpPopup = () => {
    setIsHelpPopupOpen(isHelpPopupOpen => !isHelpPopupOpen);
  }

  // useEffect(() => {
  //   console.log(file)
  // }, [file]);

  return (
    <div className="bg-[#E8E9EB] h-screen">
      <TranslationButtons />
      <h1 className="text-black text-4xl pt-14 text-center font-medium">
        {translations[currentLanguage].title}
      </h1>
      <div className="flex flex-row justify-center items-center gap-2">
        <h1 className="text-black text-4xl mt-20 text-center font-medium">
          {translations[currentLanguage].sendFilePart1}
          <span className="text-[#000066]"> {translations[currentLanguage].sendFileXLSX} </span>
          {translations[currentLanguage].sendFilePart2}
        </h1>
        <div className="relative">
          <Question onMouseEnter={handleHelpPopup} onMouseLeave={handleHelpPopup} size={42} className="text-[#000066] mt-20" />
            <div className={`absolute p-4 bg-[#E8E9EB] rounded-lg shadow-xl w-60 transition-opacity duration-300 ${isHelpPopupOpen ? "opacity-100" : "opacity-0"}`}>
              <div className="justify-between items-center">
                <p className="mt-2 text-black font-semibold text-center">
                    {translations[currentLanguage].popupTitle}
                </p>
              </div>
            </div>
        </div>

      </div>
      {/* Drag and drop */}
      <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mt-6 border-4 border-dashed border-[#000066] h-80 w-2/5 flex flex-col justify-center mx-auto items-center gap-8 ${isEnter && 'bg-blue-200'}`}>
        <Download size={70} className="text-[#000066]"/>
        <p className="text-2xl">
          {translations[currentLanguage].selectFile}
        </p>
        <p className="text-xl line-clamp-1 px-4 min-h-7">
          {incorrectFile ?
              <p className="text-red-500">{translations[currentLanguage].incorrectFile}</p> :
                file ? file.name : ''
          }
        </p>

        <button
            className="bg-[#000066] text-white w-44 h-9 rounded-xl text-lg text-center transition duration-100 transform hover:scale-105"
            onClick={triggerFileInput}
        >
          {translations[currentLanguage].button}
        </button>

        <input
            id="fileInput"
            type="file"
            accept=".xlsx"
            style={{display: 'none'}}
            onChange={handleFileChange}
        />
      </div>

      <div className="flex justify-end mt-10 mr-10">
        <button
            className={`w-44 h-9 flex items-center justify-center rounded-xl text-lg text-center transition duration-100 transform mt-4 ${file ? "bg-Blue hover:scale-105 shadow-2xl text-white" : "shadow-inner bg-gray-300 text-gray-400"}`}
            disabled={!file}
            onClick={openModal}
        >
          {isLoading ? (
            <div className="spinner justify-self-center"></div>
            ) : (
              translations[currentLanguage].sendButton
            )}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#E8E9EB] py-6 rounded-lg shadow-xl w-[60%] h-[90%]">
            <div className="flex flex-row items-center justify-between">
              <div className="flex-grow text-center pl-10">
                <h2 className="text-3xl font-semibold">{translations[currentLanguage].titleModal}</h2>
              </div>
              <button onClick={closeModal} className="ml-auto transition duration-100 transform hover:scale-105 mr-2">
                <XCircle size={48} color="#CC0000" />
              </button>
            </div>

            {/* Lista de nomes rolável */}
            <div className="mt-4 overflow-y-auto h-[80%] mx-6">
              <div className="grid grid-cols-1 gap-4 justify-center">
                {names.map((name, index) => (
                  <div key={index} className="bg-white mr-6 p-2 pl-5 rounded-xl shadow-md flex items-center justify-between">
                    <p className="text-2xl text-black">{name}</p>
                    <button className="flex items-center" onClick={() => handleCheckboxToggle(index)}>
                      <div className={`rounded-xl border-2 border-[#000066] w-10 h-10 flex items-center justify-center`}>
                        {selectedIndexes.includes(index) && <Check color="#000066" size={30} />}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center py-5 absolute w-[75%]">
              <div className="flex items-center mx-auto">
                <button
                  className="bg-[#000066] text-white w-44 h-10 rounded-xl text-2xl text-center transition duration-100 transform hover:scale-105"
                >
                  {translations[currentLanguage].buttonModal}
                </button>

                <button className="ml-10 flex flex-row" onClick={handleButtonClick}>
                  <div className="rounded-xl border-2 border-[#000066] w-10 h-10 flex items-center justify-center">
                    {showCheck && <Check size={30} color="#000066" />}
                  </div>
                  <p className="pl-4 text-2xl py-1">{translations[currentLanguage].verifiedAll}</p>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
