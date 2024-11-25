import TranslationButtons from '@/components/translationButtons';
import { msalInstance } from '@/api/auth/msalConfig';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        const currentAccount = msalInstance.getActiveAccount();
        if (currentAccount && currentAccount.idTokenClaims) {
            setName(currentAccount.idTokenClaims.name || null);
        }
    }, []);

    const handleLogout = () => {
        msalInstance.logoutRedirect({
            postLogoutRedirectUri: window.location.origin,
            account: msalInstance.getActiveAccount(),
        }).catch((error) => {
            console.error("Logout failed:", error);
            window.location.href = window.location.origin;
        });
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-light-gray flex flex-col items-center pt-20">
            <TranslationButtons />

            <div className="flex flex-col items-center mb-10">
                <div
                    className="w-32 h-32 rounded-full bg-cover bg-center mb-4 shadow-md"
                />
                <h1 className="text-3xl text-black font-semibold">{name || 'User'}</h1>
            </div>

            <button
                className="w-80 h-16 rounded-[30px] shadow-md bg-red-600 text-white text-2xl font-medium flex justify-center items-center transition-all duration-300 transform hover:scale-110 hover:bg-red-700"
                onClick={handleLogout}
            >
                Log Out
            </button>
        </div>
    );
}
