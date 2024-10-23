import { useEffect } from "react";
import { useLanguage } from "../../components/languageProvider";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const { currentLanguage } = useLanguage();
    const navigate = useNavigate();

    const translations = {
        en: {
            pageNotFound: 'Page Not Found',
            outOfTrack: 'It seems you went out of track!',
            lookingFor: 'Couldn\'t find what you were looking for?',
            goBack: 'Click here to go back',
        },
        pt: {
            pageNotFound: 'Página Não Encontrada',
            outOfTrack: 'Não encontramos o que você procurava.',
            lookingFor: 'Não achou o que queria?',
            goBack: 'Clique aqui para voltar',
        }
    };

    useEffect(() => {
        console.log(localStorage.getItem('lang'))
    }, [])

    return (
        <div className="bg-[#E8E9EB] h-screen flex flex-col items-center justify-between">
            <div/>
            <div className="flex flex-col items-center">
                <h1 className="text-9xl text-blue">404</h1>
                <p className="text-4xl text-blue font-medium">{translations[currentLanguage].pageNotFound}</p>
                <p className="mt-4 mb-8 text-4xl">{translations[currentLanguage].outOfTrack}</p>
            </div>
            <div className="flex flex-col items-center gap-4 mb-8">
                <p className="text-2xl">{translations[currentLanguage].lookingFor}</p>
                <a className="text-lg text-blue underline hover:text-cyan-500 cursor-pointer" onClick={() => navigate(-1)}>{translations[currentLanguage].goBack}</a>
            </div>
        </div>
    );
}
