import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image_background_login from '@/assets/images/Image_background_login.png';
import logo_maua from '@/assets/images/logo_maua.png';
import { useLanguage } from '@/components/languageProvider';
import TranslationButtons from '@/components/translationButtons';
import { msalInstance, initializeMsal } from '@/api/auth/msalConfig'; // Import initializeMsal function
import { useProfileStore } from '@/stores/profileStore';

const translations = {
  en: {
    loginTitle: 'Please enter login details',
    emailPlaceholder: 'E-mail or ID',
    passwordPlaceholder: 'Password',
    errorMessage: 'Please fill in all fields.',
    forgotPassword: 'Forgot password?',
    loginButton: 'Login',
    orText: 'or',
    microsoftButton: 'Sign in with Microsoft'
  },
  pt: {
    loginTitle: 'Por favor, insira os dados de login',
    emailPlaceholder: 'E-mail ou ID',
    passwordPlaceholder: 'Senha',
    errorMessage: 'Por favor, preencha todos os campos.',
    forgotPassword: 'Esqueceu a senha?',
    loginButton: 'Entrar',
    orText: 'ou',
    microsoftButton: 'Entrar com a Microsoft'
  }
};

export default function Login() {
  const [isMsalInitialized, setMsalInitialized] = useState(false); // Add state to track MSAL initialization
  const setProfilePictureUrl = useProfileStore((state) => state.setProfilePictureUrl);
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  // Initialize MSAL on component mount
  useEffect(() => {
    const initialize = async () => {
      await initializeMsal(); // Initialize MSAL
      setMsalInitialized(true); // Set initialization status
    };
    initialize();
  }, []);

  const getProfilePicture = async (accessToken: string): Promise<string | null> => {
    try {
      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } else {
        console.log("Failed to fetch profile picture");
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  };

  const handleMicrosoftLogin = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL is not initialized. Please wait and try again.");
      return;
    }

    try {
      sessionStorage.removeItem("msal.interaction.status");
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["openid", "profile", "email", "User.Read"],
      });

      if (loginResponse && loginResponse.account) {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: loginResponse.account,
        });

        const accessToken: string = tokenResponse.accessToken;
        const profilePictureUrl = await getProfilePicture(accessToken);
        msalInstance.setActiveAccount(loginResponse.account);
        setProfilePictureUrl(profilePictureUrl);

        navigate('/professor');

        const response = await fetch("http://localhost:8000/auth/microsoft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loginResponse.idToken}`  // Include ID token
          },
          body: JSON.stringify({ email: loginResponse.account.username })
        });

        if (response.ok) {
          console.log("User linked to internal account successfully.");
          // Redirect user or update UI to show successful authentication
        } else {
          console.error("Failed to link Microsoft account to internal system.");
        }
      }

      else {
        console.log("Microsoft login completed but no account information was returned.");
      }
    } catch (error) {
      console.error("Microsoft login failed:", error);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <img
        src={Image_background_login}
        alt="image background"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
        <TranslationButtons />

        <div className='bg-[#EDEDED] w-[450px] h-[400px] z-10 rounded-3xl flex flex-col items-center pt-6 shadow-lg shadow-slate-500'>
          <img src={logo_maua} alt="logo_maua" className='mb-4' />
          <h1 className='text-[#000066] text-xl pt-3 pb-14'>{translations[currentLanguage].loginTitle}</h1>
          <button
            className='bg-[#000066] text-white w-64 h-11 rounded-xl text-xl transition duration-100 transform hover:scale-105'
            onClick={handleMicrosoftLogin} // Use this to trigger Microsoft login
          >
            {translations[currentLanguage].microsoftButton}
          </button>
        </div>
      </div>
    </div>
  );
}


