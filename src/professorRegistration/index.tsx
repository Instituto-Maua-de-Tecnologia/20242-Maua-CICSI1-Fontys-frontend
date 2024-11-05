import { Download, Question } from "phosphor-react";


export default function ProfessorRegistration() {
    const translations = {
        en: {
            title: 'Professor Registration',
            sendFile: 'Send a .csv file',
            selectFile: 'Select a file or drag it here',
            button: 'Select file'
        }
    }

    return (
       <div className="bg-[#E8E9EB] h-screen">
        <h1 className="text-black text-4xl pt-14 text-center font-medium">Professor Registration</h1>
        <div className="flex flex-row justify-center items-center gap-2">
            <h1 className="text-black text-4xl mt-20 text-center font-medium">
            Send a <span className="text-[#000066]">.csv </span>file
            </h1>
            <Question size={42} className="text-[#000066] mt-20"/>
        </div>
        <div className="mt-6 border-4 border-dashed border-[#000066] h-80 w-2/5 flex flex-col justify-center mx-auto items-center gap-10">
            <Download size={70} className="text-[#000066]"/>
            <p className="text-2xl">Select a file or drag it here</p>
            <button className="bg-[#000066] text-white w-44 h-9 rounded-xl text-base text-center">Select file</button>
        </div>
       </div> 
    )
}
