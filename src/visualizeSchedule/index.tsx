import { ArrowCircleLeft } from "phosphor-react";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import TableVisualizeSchedule from "../components/tableVisualizeSchedule";
import { useLanguage } from '../components/languageProvider';

export default function VisualizeSchedule() {
    const translations = {
        en: {
            VisualizeScheduleTitle: 'Visualize Schedule',
            subjectPlaceholder: 'Subject Captions',
            subjects: [
                { label: "TTI203 - Multiplatform Development", value: "TTI203" },
                { label: "TTI205 - Software Engineering", value: "TTI205" },
                { label: "TTI206 - Interdisciplinary Integrative Project", value: "TTI206" },
                { label: "CIC205 - Linear Algebra and Analytic Geometry", value: "CIC205" },
                { label: "CIC206 - Computer Theory", value: "CIC206" },
            ]
        },
        pt: {
            VisualizeScheduleTitle: 'Visualizar Horário',
            subjectPlaceholder: 'Matérias',
            subjects: [
                { label: "TTI203 - Desenvolvimento Multiplataforma", value: "TTI203" },
                { label: "TTI205 - Engenharia de Software", value: "TTI205" },
                { label: "TTI206 - Projeto Integrador Interdisciplinar", value: "TTI206" },
                { label: "CIC205 - Álgebra Linear e Geometria Analítica", value: "CIC205" },
                { label: "CIC206 - Teoria da Computação", value: "CIC206" },
            ]
        }
    };

    const { currentLanguage } = useLanguage();
    const subjects = translations[currentLanguage].subjects;

    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    const onSubjectChange = (e: { value: string }) => {
        setSelectedSubject(e.value);

    };

    const itemTemplate = (option: { label: string; value: string }) => {
        return (
            <div className="rounded-md p-2 mt-1 ml-2 text-xs justify-center items-center bg-white text-black w-[280px]">
                {option.label}
            </div>
        );
    };

    return (
        <div className="bg-[#F5F5F5] h-screen">
            <button>
                <ArrowCircleLeft
                    color="#000066"
                    size={48}
                    className="fixed left-28 top-8"
                />
            </button>
            <div className="flex flex-row">
                <h1 className="text-[#000000] text-4xl absolute top-8 left-1/2 transform -translate-x-1/2">
                    {translations[currentLanguage].VisualizeScheduleTitle}
                </h1>
                <div className="border-2 border-black absolute top-8 left-2/3 rounded-lg">
                    <Dropdown
                        value={selectedSubject}
                        options={subjects}
                        onChange={onSubjectChange}
                        placeholder={translations[currentLanguage].subjectPlaceholder}
                        className="text-xl px-2 w-[280px] h-10 justify-center items-center rounded-lg bg-white"
                        itemTemplate={itemTemplate}
                        panelClassName="w-72"
                    />
                </div>
            </div>
            <div className="flex justify-center mt-12 mb-1">
                <TableVisualizeSchedule/>
            </div>
        </div>
    );
}
