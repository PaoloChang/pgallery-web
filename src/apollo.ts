import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

/**
 * ! TODO: MUST VERIFY VALID TOKEN
 */
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
}

export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enabledDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
}

export const disabledDarkMode = () => {
    localStorage.setItem(DARK_MODE, "disabled");
    darkModeVar(false);
}

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});