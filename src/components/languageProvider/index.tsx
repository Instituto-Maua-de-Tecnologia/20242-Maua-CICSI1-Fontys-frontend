import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

const LanguageContext = createContext<{
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
} | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const lang = localStorage.getItem('lang') as Language;
    if (lang === 'en' || lang === 'pt') {
      setCurrentLanguage(lang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
