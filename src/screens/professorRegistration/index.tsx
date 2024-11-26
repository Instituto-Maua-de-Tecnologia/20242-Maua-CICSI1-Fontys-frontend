import { useState } from "react";
import { useLanguage } from "@/components/languageProvider";
import TranslationButtons from "@/components/translationButtons";
import { Check, Download, Question, XCircle } from "phosphor-react";

export default function ProfessorRegistration() {
  const { currentLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showCheck, setShowCheck] = useState(false);

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
      sendFileCSV: '.csv',
      sendFilePart2: 'file',
      titleModal: 'Verify Professors',
      buttonModal: "Confirm",
      verifiedAll: "Verified All"
    },
    pt: {
      title: 'Cadastro de Professores',
      selectFile: 'Selecione um arquivo ou arraste-o aqui',
      button: 'Selecionar arquivo',
      sendFilePart1: 'Envie um arquivo',
      sendFileCSV: '.csv',
      sendFilePart2: '',
      titleModal: 'Professores Verificados',
      buttonModal: "Confirmar",
      verifiedAll: "Marcar Todos"
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#E8E9EB] h-screen">
      <TranslationButtons />
      <h1 className="text-black text-4xl pt-14 text-center font-medium">
        {translations[currentLanguage].title}
      </h1>
      <div className="flex flex-row justify-center items-center gap-2">
        <h1 className="text-black text-4xl mt-20 text-center font-medium">
          {translations[currentLanguage].sendFilePart1}
          {currentLanguage === 'en' && <span className="text-[#000066]"> {translations[currentLanguage].sendFileCSV} </span>}
          {translations[currentLanguage].sendFilePart2}
          {currentLanguage === 'pt' && <span className="text-[#000066]"> {translations[currentLanguage].sendFileCSV} </span>}
        </h1>
        <Question size={42} className="text-[#000066] mt-20" />
      </div>
      <div className="mt-6 border-4 border-dashed border-[#000066] h-80 w-2/5 flex flex-col justify-center mx-auto items-center gap-10">
        <Download size={70} className="text-[#000066]" />
        <p className="text-2xl">
          {translations[currentLanguage].selectFile}
        </p>
        <button
          className="bg-[#000066] text-white w-44 h-9 rounded-xl text-lg text-center transition duration-100 transform hover:scale-105"
          onClick={openModal}
        >
          {translations[currentLanguage].button}
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
