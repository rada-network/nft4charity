const storagePrefix = 'bulletproof_react_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  getUserToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}user_token`) as string);
  },
  setUserToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}user_token`, JSON.stringify(token));
  },
  clearUserToken: () => {
    window.localStorage.removeItem(`${storagePrefix}user_token`);
  },
};

export default storage;
