    import { useState } from "react";
    import { useLanguage } from '../languageProvider';
import TranslationButtons from "../translationButtons";

    export default function TableVisualizeSchedule() {

        // Definindo os cronogramas para cada semestre
        const schedules: { [key: number]: { time: string; monday: string; tuesday: string; wednesday: string; thursday: string; friday: string; saturday: string; }[] } = {
            1: [
                { time: "7h40 - 9h20", monday: "TT1203\nRodrigo Bossini", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "9h30 - 11h10", monday: "TT1203\nRodrigo Bossini", tuesday: "TT1204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "11h20 - 13h00", monday: "TT1206\nRudolf", tuesday: "TT1204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            ],
            2: [
                { time: "7h40 - 9h20", monday: "TT1204\nGuardado", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "9h30 - 11h10", monday: "TT1204\nGuardado", tuesday: "TT1206\nRudolf", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "11h20 - 13h00", monday: "TT1203\nRodrigo Bossini", tuesday: "TT1206\nRudolf", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            ],
            3: [
                { time: "7h40 - 9h20", monday: "TT1206\nRudolf", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "9h30 - 11h10", monday: "TT1206\nRudolf", tuesday: "TT1203\nRodrigo Bossini", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "11h20 - 13h00", monday: "TT1204\nGuardado", tuesday: "TT1203\nRodrigo Bossini", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            ],
            4: [
                { time: "7h40 - 9h20", monday: "TT1203\nRodrigo Bossini", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "9h30 - 11h10", monday: "TT1203\nRodrigo Bossini", tuesday: "TT1204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "11h20 - 13h00", monday: "TT1206\nRudolf", tuesday: "TT1204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
                { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            ],
        };

        const translations = {
            en: {
                semesterTitles: ["1st Semester", "3rd Semester", "5th Semester", "7th Semester"],
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            },
            pt: {
                semesterTitles: ["1º Semestre", "3º Semestre", "5º Semestre", "7º Semestre"],
                days: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
            }
        }

       

        // Função auxiliar para definir as classes de estilo
        const getCellStyle = (text: string) => {
            if (text.includes("Rodrigo Bossini")) {
                return 'bg-[#2B49A3] text-white';
            } else if (text.includes("Guardado")) {
                return 'bg-gray-500 text-white';
            } else if (text.includes("Rudolf")) {
                return 'bg-[#857A77] text-white';
            }
            return '';
        };
        
        const { currentLanguage } = useLanguage();

        const [selectedSemester, setSelectedSemester] = useState<number>(1); // Estado para armazenar o semestre selecionado

        // Função para definir qual semestre foi selecionado
        const handleButtonClick = (index: number) => {
            setSelectedSemester(index);
        };

        // Seleciona o cronograma baseado no semestre
        const currentSchedule = schedules[selectedSemester];



        return (
            <div className="container mx-auto px-4 py-6">
                <div className="overflow-x-auto">
                    {/* Botões para selecionar o semestre */}
                    <div className="rounded-t-lg h-10 border-t-2 border-l-2 border-r-2 border-black flex flex-row">
                        {translations[currentLanguage]?.semesterTitles.map((semester, index) => (
                            <div
                                key={index}
                                className={`h-10 w-1/4 ${index !== 3 ? 'border-r-2' : ''} border-black`}
                            >
                                <button
                                    className={`h-full w-full ${selectedSemester === index + 1 ? 'bg-[#2B49A3] text-white' : 'bg-transparent text-black'}`}
                                    onClick={() => handleButtonClick(index + 1)}
                                >
                                    <p>{semester}</p>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Tabela de horários */}
                    <table className="min-w-full border-collapse border-2 border-black rounded-lg">
                        <thead>
                            <tr>
                                <th className="border-2 border-black w-40 text-center rounded-tl-lg"></th>
                                {translations[currentLanguage]?.days.map((day, index) => (
                                    <th key={index} className={`border-2 border-black p-4 w-40 text-center text-xl ${index === translations[currentLanguage].days.length - 1 ? 'rounded-tr-lg' : ''}`}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentSchedule.map((row, index) => (
                                <tr key={index}>
                                    <td className="border-2 border-black text-center">{row.time}</td>
                                    <td className={`border-2 border-black p-2 text-center whitespace-pre-line ${getCellStyle(row.monday)}`}>{row.monday}</td>
                                    <td className={`border-2 border-black p-2 text-center whitespace-pre-line ${getCellStyle(row.tuesday)}`}>{row.tuesday}</td>
                                    <td className={`border-2 border-black p-2 text-center ${getCellStyle(row.wednesday)}`}>{row.wednesday}</td>
                                    <td className={`border-2 border-black p-2 text-center ${getCellStyle(row.thursday)}`}>{row.thursday}</td>
                                    <td className={`border-2 border-black p-8 text-center ${getCellStyle(row.friday)}`}>{row.friday}</td>
                                    <td className={`border-2 border-black p-2 text-center ${getCellStyle(row.saturday)}`}>{row.saturday}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
