import TranslationButtons from '@/components/translationButtons';
import { msalInstance } from '@/api/auth/msalConfig';
import React, { useState, useEffect } from 'react';
import {ArrowCircleLeft} from "phosphor-react";
import {useNavigate} from "react-router-dom";
import { ProfilePicture } from '@/components/profile/ProfilePicture.tsx';

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

    const navigate = useNavigate();
    const handleReturnClick = () => {
        navigate(-1);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-light-gray flex flex-col items-center pt-20">
            <button>
                <ArrowCircleLeft
                    color="#000066"
                    size={48}
                    className="fixed left-5 top-5"
                    onClick={handleReturnClick}
                />
            </button>
            <TranslationButtons/>

            <div className="flex flex-col items-center mb-10">
                <ProfilePicture
                    size={128}
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
