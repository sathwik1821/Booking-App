const TOKEN_KEY = 'airbnb_access_token';

export const getToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token || token === 'undefined' || token === 'null' || token === '') return null;
    return token;
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  if (token && token !== 'undefined' && token !== 'null') {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
};

export const isAuthenticated = () => !!getToken();
