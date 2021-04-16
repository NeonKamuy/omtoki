export const __CONFIG__ = {
    backendURL: "/api"
}

export function getAccessToken() {
    return window.sessionStorage.getItem(`accessToken`) ?? "";
}

export function setAccessToken(token: string) {
    window.sessionStorage.setItem(`accessToken`, token);
}