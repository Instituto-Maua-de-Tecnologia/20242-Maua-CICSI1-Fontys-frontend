import { Configuration, PublicClientApplication } from "@azure/msal-browser";

// Define the MSAL configuration
const msalConfig: Configuration = {
    auth: {
        clientId: "b55f918c-264c-437d-98ad-c7efd3afcdf4",
        authority: "https://login.microsoftonline.com/3953a2c3-4821-4818-ae33-a4c5bcc5fdfb",
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};
export const msalInstance = new PublicClientApplication(msalConfig);
export async function initializeMsal() {
    return msalInstance.initialize();
}

// For microsoft login