import { useEffect, useState } from "react";
import { useLanguage } from '../languageProvider';


export default function TableVisualizeSchedule(selectedSubject: object | null) {
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);

    // Definindo os cronogramas para cada semestre
    const schedules: { [key: number]: { time: string; monday: string; tuesday: string; wednesday: string; thursday: string; friday: string; saturday: string; }[] } = {
        1: [
            { time: "7h40 - 9h20", monday: "TTI203\nRodrigo Bossini", tuesday: "TTI206\nRudolf", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "9h30 - 11h10", monday: "TTI203\nRodrigo Bossini", tuesday: "TTI204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "11h20 - 13h00", monday: "TTI204\nGuardado", tuesday: "TTI203\nRodrigo Bossini", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
        ],
        2: [
            { time: "7h40 - 9h20", monday: "TTI204\nGuardado", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "9h30 - 11h10", monday: "TTI204\nGuardado", tuesday: "TTI206\nRudolf", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "11h20 - 13h00", monday: "TTI203\nRodrigo Bossini", tuesday: "TTI206\nRudolf", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
        ],
        3: [
            { time: "7h40 - 9h20", monday: "TTI206\nRudolf", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "9h30 - 11h10", monday: "TTI206\nRudolf", tuesday: "TTI203\nRodrigo Bossini", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "11h20 - 13h00", monday: "TTI204\nGuardado", tuesday: "TTI203\nRodrigo Bossini", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "13h10 - 14h50", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "15h00 - 16h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "16h50 - 18h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "19h00 - 20h40", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "20h50 - 22h30", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
        ],
        4: [
            { time: "7h40 - 9h20", monday: "TTI203\nRodrigo Bossini", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "9h30 - 11h10", monday: "TTI203\nRodrigo Bossini", tuesday: "TTI204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
            { time: "11h20 - 13h00", monday: "TTI206\nRudolf", tuesday: "TTI204\nGuardado", wednesday: "", thursday: "", friday: "", saturday: "" },
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
    const getCellStyle = (text: string, isSelected: boolean) => {
        const baseStyle = 'border border-black px-2 py-3 min-w-[100px] min-h-[50px] transition-all';
        const selectedStyle = isSelected ? 'border-4 border-black-500' : '';
        const selectedSubjectStyle = selectedSubject ? text.includes(selectedSubject.selectedSubject) ? 'bg-[#2B49A3] text-white' : 'bg-gray-500' : '';
        if (text.includes("Rodrigo Bossini")) {
            return `${baseStyle} ${selectedStyle} ${selectedSubjectStyle} text-white bg-[#2B49A3]`;
        } else if (text.includes("Guardado")) {
            return `${baseStyle} text-white ${selectedStyle} ${selectedSubjectStyle}`;
        } else if (text.includes("Rudolf")) {
            return `${baseStyle} text-white ${selectedStyle} ${selectedSubjectStyle}`;
        }
        return `${baseStyle} ${selectedStyle}`;
    };


    const { currentLanguage } = useLanguage();
    const [selectedSemester, setSelectedSemester] = useState<number>(1); // Estado para armazenar o semestre selecionado
    const [currentSchedule, setCurrentSchedule] = useState(schedules[1]); // Estado inicial do cronograma

    const handleCellClick = (rowIndex: number, col: keyof typeof currentSchedule[0]) => {
        const clickedCell = currentSchedule[rowIndex][col];
        if (!clickedCell && selectedCell === null) return; // Bloqueia seleção inicial em células vazias

        if (selectedCell === null) {
            setSelectedCell({ row: rowIndex, col });
        } else {
            const selectedContent = currentSchedule[selectedCell.row][selectedCell.col as keyof typeof currentSchedule[0]];
            if (!selectedContent) return; // Evita trocar células vazias

            const newSchedule = [...currentSchedule];
            newSchedule[selectedCell.row][selectedCell.col as keyof typeof currentSchedule[0]] = clickedCell;
            newSchedule[rowIndex][col] = selectedContent;

            setCurrentSchedule(newSchedule);
            // saveScheduleToStorage(selectedSemester, newSchedule); // Salva no localStorage
            setSelectedCell(null);
        }
    };

    const handleSemesterChange = (semester: number) => {
        setSelectedSemester(semester);
        setCurrentSchedule(schedules[semester]);
    };

    // useEffect(() => {
    //     const loadedSchedule = getScheduleFromStorage(selectedSemester);
    //     setCurrentSchedule(loadedSchedule);
    // }, [selectedSemester]);
    //

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="overflow-x-auto">
                <div className="rounded-t-lg h-10 border-t-2 border-l-2 border-r-2 border-black flex">
                    {translations[currentLanguage]?.semesterTitles.map((semester, index) => (
                        <button
                            key={index}
                            className={`flex-1 py-2 
                             ${index !== translations[currentLanguage]?.semesterTitles.length - 1 ? "border-r-2 border-black" : ""} 
                             ${selectedSemester === index + 1 ? "bg-[#2B49A3] text-white" : "bg-transparent text-black"}`}
                            onClick={() => handleSemesterChange(index + 1)}
                        >
                            {semester}
                        </button>
                    ))}
                </div>
                <table
                    className="w-full border-collapse table-fixed border-l-2 border-b-2 border-r-2 border-black rounded-lg text-center"
                >
                    <thead>
                        <tr>
                            <th className="border-2 border-black w-40 h-16 px-6 py-4">Time</th>
                            {translations[currentLanguage]?.days.map((day, index) => (
                                <th
                                    key={index}
                                    className="border-2 border-black w-[150px] h-16 px-6 py-4"
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentSchedule.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border-2 border-black w-40 h-16 px-6 py-4">
                                    {row.time}
                                </td>
                                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((col) => (
                                    <td
                                        key={col}
                                        onClick={() => handleCellClick(rowIndex, col as keyof typeof currentSchedule[0])}
                                        className={
                                            getCellStyle(
                                                row[col as keyof typeof row],
                                                selectedCell?.row === rowIndex && selectedCell?.col === col
                                            ) + " w-[150px] h-16"
                                        }
                                    >
                                        {row[col as keyof typeof row]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
