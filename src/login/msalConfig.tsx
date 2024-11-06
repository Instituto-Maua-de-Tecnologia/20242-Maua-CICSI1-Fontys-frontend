import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const msalConfig: Configuration = {
    auth: {
        clientId: "b55f918c-264c-437d-98ad-c7efd3afcdf4",
        authority: "https://login.microsoftonline.com/3953a2c3-4821-4818-ae33-a4c5bcc5fdfb",
        redirectUri: "http://localhost/callback",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// For microsoft login